import { readdir } from "node:fs/promises";
import type {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
} from "discord.js";
import type { CommandOptions } from "./types";

export interface RunnableCommands {
  [command: string]: {
    run: (intent: ChatInputCommandInteraction) => any;
    description: string;
    nsfw: boolean;
    options: CommandOptions[];
  };
}

export interface RunnableEvents {
  [event: string]: (
    intent:
      | AnySelectMenuInteraction
      | ButtonInteraction
      | ModalSubmitInteraction,
    args?: string[]
  ) => any;
}

/**
 * Gets all commands (.ts files) from ./commands/ and imports them
 * @returns {object} Commands in an object (key is the name of command and value is an object with the keys run, description, nsfw and options)
 * @property {function} run Function that executes the command
 * @property {string} description Command description
 * @property {boolean} nsfw Whether or not the command is only available in NSFW channels / DMs
 * @property {object} options List of command arguments
 */
export const importCommands = async (): Promise<RunnableCommands> => {
  const commandFiles = (await readdir("./commands")).filter((filename) =>
    filename.endsWith(".ts")
  );

  const runnableCommands: RunnableCommands = {};

  for (let i = 0, len = commandFiles.length; i < len; i++) {
    const filename = commandFiles[i];
    const filenameWithoutExtension = filename.replace(".ts", "");

    await import(`./commands/${filename}`)
      .then((command) => {
        if (!command.description || !command.run) throw null;

        runnableCommands[filenameWithoutExtension] = {
          run: command.run,
          description: command.description,
          nsfw: command.nsfw || false,
          options: command.options,
        };

        console.log(
          `\x1b[32mCommand ${filenameWithoutExtension} loaded\x1b[0m`
        );
      })
      .catch(() => {
        console.error(
          `\x1b[31mFailed to load command ${filenameWithoutExtension}\x1b[0m`
        );
      });
  }

  const importedCommandCount = Object.keys(runnableCommands).length;
  const allCommandsCount = commandFiles.length;
  let logColor = "\x1b[32m";

  if (importedCommandCount === 0) logColor = "\x1b[31m";
  else if (importedCommandCount < allCommandsCount) logColor = "\x1b[33m";

  console.log(
    `\n${logColor}Loaded ${importedCommandCount} out of ${allCommandsCount} commands\x1b[0m\n`
  );

  return runnableCommands;
};

/**
 * Gets all events (.ts files) from ./events/ and imports them
 * @returns List of events in an object (key is the name of event and value is a function)
 */
export const importEvents = async (): Promise<RunnableEvents> => {
  const eventFiles = (await readdir("./events")).filter((filename) =>
    filename.endsWith(".ts")
  );

  const runnableEvents: RunnableEvents = {};

  for (let i = 0, len = eventFiles.length; i < len; i++) {
    const filename = eventFiles[i];
    const filenameWithoutExtension = filename.replace(".ts", "");

    await import(`./events/${filename}`)
      .then((event) => {
        if (!event) throw null;

        runnableEvents[filenameWithoutExtension] = event.default;

        console.log(`\x1b[32mEvent ${filenameWithoutExtension} loaded\x1b[0m`);
      })
      .catch(() => {
        console.error(
          `\x1b[31mFailed to load event ${filenameWithoutExtension}\x1b[0m`
        );
      });
  }

  const importedEventCount = Object.keys(runnableEvents).length;
  const allEventsCount = eventFiles.length;
  let logColor = "\x1b[32m";

  if (importedEventCount === 0) logColor = "\x1b[31m";
  else if (importedEventCount < allEventsCount) logColor = "\x1b[33m";

  console.log(
    `\n${logColor}Loaded ${importedEventCount} out of ${allEventsCount} events\x1b[0m\n`
  );

  return runnableEvents;
};

import { Client, GatewayIntentBits } from "discord.js";

import getToken from "./token";
import registerCommands from "./register";
import { importCommands, importEvents } from "./imports";

const token = getToken();
const commands = await importCommands();
const events = await importEvents();
if (process.argv.at(-1) === "--register")
  await registerCommands(token, commands);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`${client.user?.displayName} is ready\n`);
});

client.on("interactionCreate", (interaction) => {
  if ("customId" in interaction) {
    const eventDetails = interaction.customId.split(":");
    const eventName = eventDetails[0];
    const eventArgs = eventDetails.slice(1);
    const event = events[eventName];

    if (eventName in events)
      return eventArgs.length
        ? event(interaction, eventArgs)
        : event(interaction);
  }

  if (interaction.isChatInputCommand() && interaction.commandName in commands)
    return commands[interaction.commandName].run(interaction);
});

client.login(token);

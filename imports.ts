import { readdir } from "node:fs/promises";
import type { Interaction } from "discord.js";

export interface RunnableCommands {
	[command: string]: {
		run: (intent: Interaction) => any;
		description: string;
	};
}

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
					description: command.description
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

import { REST, Routes } from "discord.js";
import type { RunnableCommands } from "./imports";
import type { CommandOptions } from "./types";

interface Command {
	name: string;
	description: string;
	options: CommandOptions;
}

export default async (token: string, runnableCommands: RunnableCommands) => {
	const commandNames = Object.keys(runnableCommands);

	let commands: Command[] = [];

	for (let i = 0, len = commandNames.length; i < len; i++) {
		const commandName = commandNames[i];
		commands.push({
			name: commandName,
			description: runnableCommands[commandName].description,
			options: runnableCommands[commandName].options
		});
	}

	const rest = new REST({ version: "10" }).setToken(token);

	const appId = ((await rest.get(Routes.currentApplication())) as any).id;

	await rest
		.put(Routes.applicationCommands(appId), { body: commands })
		.then(() => {
			console.log(
				"\x1b[32mSuccesfully reloaded application slash commands\x1b[0m"
			);
		})
		.catch((err) => console.error(`\x1b[31m${err}\x1b[0m`));
};

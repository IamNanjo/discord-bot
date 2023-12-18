import type { ChatInputCommandInteraction } from "discord.js";
import type { CommandOptions } from "../types";

export const description = "Replies with Pong!";
export const options: CommandOptions[] = [
	{
		name: "test",
		description: "Does nothing",
		type: 3,
		required: true,
		choices: [
			{ name: "option 1", value: "1" },
			{ name: "option 2", value: "2" }
		]
	}
];

export const run = async (interaction: ChatInputCommandInteraction) => {
	await interaction.reply({ content: "Pong!", ephemeral: true });
	console.log(interaction.options.getString("test"));
};

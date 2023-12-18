import type { ChatInputCommandInteraction } from "discord.js";
import type { CommandOptions } from "../types";

export const description = "Replies with Pong!";
export const options: CommandOptions[] = [];

export const run = async (interaction: ChatInputCommandInteraction) => {
	await interaction.reply({ content: "Pong!", ephemeral: true });
};

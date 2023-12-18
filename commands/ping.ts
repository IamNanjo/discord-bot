import type { ChatInputCommandInteraction } from "discord.js";

export const description = "Replies with Pong!";

export const run = async (interaction: ChatInputCommandInteraction) => {
	await interaction.reply({ content: "Pong!", ephemeral: true });
};

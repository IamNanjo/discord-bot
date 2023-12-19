import { type ButtonInteraction } from "discord.js";
export default async (interaction: ButtonInteraction) => {
	await interaction.client.channels.fetch(interaction.channelId);

	if (interaction.message.interaction?.user.id !== interaction.user.id) return;

	return interaction.message.delete();
};

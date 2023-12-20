import { type ButtonInteraction } from "discord.js";
export default async (interaction: ButtonInteraction) => {
	await interaction.client.channels.fetch(interaction.channelId);

	if (interaction.message.interaction?.user.id !== interaction.user.id) {
		return interaction.reply({
			content:
				"Only the person who used this command can use the delete button",
			ephemeral: true
		});
	}

	return interaction.message.delete();
};

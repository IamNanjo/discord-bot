import type { ButtonInteraction } from "discord.js";

export default async (interaction: ButtonInteraction) => {
	if (interaction.message.interaction?.user.id && interaction.user.id) return;

	interaction.message.delete();
};

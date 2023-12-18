import { EmbedBuilder, Locale } from "discord.js";
import { ChatInputCommandInteraction, GuildMember } from "discord.js";
import type { CommandOptions } from "../types";

export const description = "Displays information about a user";
export const options: CommandOptions[] = [
	{
		name: "user",
		description: "User",
		type: 6,
		required: true
	}
];

export const run = async (interaction: ChatInputCommandInteraction) => {
	if (!interaction.member) return;

	const member = interaction.options.getMember("user");

	if (!(member instanceof GuildMember)) return;

	if (!member) return;

	const embed = new EmbedBuilder()
		.setColor("#7289da")
		.setThumbnail(member.user.avatarURL())
		.setAuthor({ name: `User Info Requested by : ${member.user.tag}` })
		.setTitle(`Information about ${member.user.tag}`)
		.addFields(
			{ name: "User's ID", value: member.user.id },
			{
				name: "User was created on : ",
				value: member.user.createdAt.toLocaleString(Locale.EnglishGB)
			}
		);

	if (member.joinedAt)
		embed.addFields({
			name: "User joined this server on : ",
			value: member.joinedAt?.toLocaleString(Locale.EnglishGB)
		});

	interaction.reply({ embeds: [embed] });
};

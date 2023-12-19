import fetchFromReddit from "../fetchFromReddit";
import {
	EmbedBuilder,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle
} from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import type { CommandOptions } from "../types";

export const description = "Fetches posts from a subreddit";
export const options: CommandOptions[] = [
	{
		name: "subreddit",
		description: "Subreddit",
		type: 3,
		required: true
	},
	{
		name: "count",
		description: "Maximum amount of posts to fetch",
		type: 4,
		required: false
	}
];

export const run = async (interaction: ChatInputCommandInteraction) => {
	const subreddit = interaction.options.getString("subreddit");
	const count = interaction.options.getInteger("count") || 1;

	if (!subreddit) {
		return interaction.reply({
			content: "No subreddit provided",
			ephemeral: true
		});
	}

	const posts = await fetchFromReddit(subreddit, count);

	if (!posts.length) {
		return interaction.reply({
			content: "Could not fetch images",
			ephemeral: true
		});
	}

	const embeds: EmbedBuilder[] = [];

	for (let i = 0, len = posts.length; i < len; i++) {
		const post = posts[i];
		const embed = new EmbedBuilder()
			.setColor("#7289da")
			.setAuthor(post.author)
			.setTitle(post.title)
			.setURL(post.url);
		if (post.imageURL) embed.setImage(post.imageURL);
		if (post.text) embed.setDescription(post.text);

		embeds.push(embed);
	}

	const deleteButton = new ButtonBuilder()
		.setCustomId("deleteRedditPosts")
		.setLabel("Delete Posts")
		.setStyle(ButtonStyle.Danger);

	const reFetchButton = new ButtonBuilder()
		.setCustomId(`refetchRedditPosts_${subreddit}_${count}`)
		.setLabel("Fetch New Posts")
		.setStyle(ButtonStyle.Primary);

	const row = new ActionRowBuilder({
		components: [reFetchButton, deleteButton]
	});

	return interaction.reply({
		embeds: embeds,
		// @ts-ignore
		components: [row]
	});
};

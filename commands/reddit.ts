import fetchFromReddit from "../fetchFromReddit";
import db from "../db";
import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ChannelType,
} from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import type { CommandOptions } from "../types";

export const description = "Fetches posts from a subreddit";
export const options: CommandOptions[] = [
  {
    name: "subreddit",
    description: "Subreddit",
    type: 3,
    required: true,
  },
  {
    name: "count",
    description: "Maximum amount of posts to fetch",
    type: 4,
    required: false,
  },
];

export const run = async (interaction: ChatInputCommandInteraction) => {
  const subreddit = interaction.options.getString("subreddit");
  const count = interaction.options.getInteger("count") || 1;

  if (!interaction.channel) {
    return interaction.reply({
      content: "This command cannot be used in this chat",
      ephemeral: true,
    });
  }

  if (!subreddit) {
    return interaction.reply({
      content: "No subreddit provided",
      ephemeral: true,
    });
  }

  const chatIsDM = interaction.channel.type === ChannelType.DM;
  const chatId = chatIsDM ? interaction.channelId : interaction.guildId;

  if (!chatId) {
    return interaction.reply({
      content: "This command cannot be used in this chat",
      ephemeral: true,
    });
  }

  let dbChat = await db.chat.findUnique({
    where: { id: chatId },
    include: { reddit: { where: { chatId, subreddit } } },
  });

  if (!dbChat) {
    dbChat = await db.chat.create({
      data: { id: chatId, reddit: { create: { subreddit } } },
      include: { reddit: { where: { chatId, subreddit } } },
    });
  }

  if (!dbChat.reddit.length) {
    dbChat.reddit.push(await db.reddit.create({ data: { chatId, subreddit } }));
  }

  let after = dbChat.reddit[0].after;

  const posts = await fetchFromReddit(subreddit, count, after);

  if (!posts.length) {
    return interaction.reply({
      content: "Could not fetch images",
      ephemeral: true,
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

    if (i === len - 1) after = post.id;
  }

  await db.reddit.update({
    where: { id: dbChat.reddit[0].id },
    data: { after },
  });

  const reFetchButton = new ButtonBuilder()
    .setCustomId(`refetchRedditPosts:${subreddit}:${count}:${after}`)
    .setLabel("Fetch New Posts")
    .setStyle(ButtonStyle.Primary);

  const deleteButton = new ButtonBuilder()
    .setCustomId("deleteRedditPosts")
    .setLabel("Delete Posts")
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder({
    components: [reFetchButton, deleteButton],
  });

  return interaction.reply({
    embeds: embeds,
    // @ts-ignore
    components: [row],
  });
};

import fetchFromReddit from "../fetchFromReddit";
import db from "../db";
import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ChannelType,
} from "discord.js";
import type { ButtonInteraction } from "discord.js";

export default async (
  interaction: ButtonInteraction,
  [subreddit, count, after]: string[]
) => {
  if (!subreddit) {
    return interaction.reply({
      content: "No subreddit provided",
      ephemeral: true,
    });
  }

  const chatIsDM = interaction.channel!.type === ChannelType.DM;
  const chatId = chatIsDM ? interaction.channelId : interaction.guildId!;

  const posts = await fetchFromReddit(subreddit, Number(count), after);

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

  return interaction.update({
    embeds: embeds,
    // @ts-ignore
    components: [row],
  });
};

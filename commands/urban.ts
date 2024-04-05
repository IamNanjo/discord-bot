import { $fetch } from "ofetch";
import {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import type { CommandOptions } from "../types";

interface Result {
  definition: string;
  permalink: string;
  thumbs_up: number;
  thumbs_down: number;
  author: string;
  word: string;
  defid: number;
  current_vote: string;
  written_on: string;
  example: string;
}

export const description = "Gets a definition from Urban Dictionary";
export const nsfw = true;
export const options: CommandOptions[] = [
  {
    name: "search",
    description: "Search term",
    type: 3,
    required: false,
  },
];

export const run = async (interaction: ChatInputCommandInteraction) => {
  const search = interaction.options.getString("search");
  let apiPath = "/v0/random";

  if (search) {
    apiPath = `/v0/define?page=1&term=${search}`;
  }

  const res: { list: Result[] } = await $fetch(
    `https://api.urbandictionary.com${apiPath}`
  ).catch(() => null);

  if (!res) {
    return interaction.reply({
      content: "Could not get definitions",
      ephemeral: true,
    });
  }

  if (!res.list.length)
    return interaction.reply({
      content: `No definitions found for "${search}"`,
      ephemeral: true,
    });

  const udLogo =
    "https://lh3.googleusercontent.com/unQjigibyJQvru9rcCOX7UCqyByuf5-h_tLpA-9fYH93uqrRAnZ0J2IummiejMMhi5Ch";

  const definition = res.list[0];

  const embed = new EmbedBuilder()
    .setColor("#7289da")
    .setAuthor({
      name: `Urban dictionary | ${definition.word}`,
      iconURL: udLogo,
    })
    .setThumbnail(udLogo)
    .setDescription(
      `**Definition:** ${definition.definition || "No definition"}
			**Example:** ${definition.example || "No example"}
			**Upvotes:** ${definition.thumbs_up || "Unknown"}
			**Downvotes:** ${definition.thumbs_down || "Unknown"}
			**Link:** [link to ${definition.word}](${
        definition.permalink || "https://www.urbandictionary.com/"
      })`
    )
    .setFooter({ text: `Written by ${definition.author || "Unknown"}` });

  const deleteButton = new ButtonBuilder()
    .setCustomId("deleteDefinition")
    .setLabel("Delete Message")
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder().addComponents(deleteButton);

  await interaction.reply({
    embeds: [embed],
    // @ts-ignore
    components: [row],
  });
};

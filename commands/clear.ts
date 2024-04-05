import { ChannelType, type ChatInputCommandInteraction } from "discord.js";
import type { CommandOptions } from "../types";

export const description = "Deletes messages";
export const options: CommandOptions[] = [
  {
    name: "count",
    description: "Delete count",
    required: true,
    type: 4,
    choices: [],
  },
];

export const run = async (interaction: ChatInputCommandInteraction) => {
  const count = interaction.options.getInteger("count");

  if (
    !interaction.guild ||
    !interaction.channel ||
    !interaction.member ||
    interaction.channel.type === ChannelType.DM
  ) {
    return interaction.reply({
      content: "This command cannot be used in this chat",
      ephemeral: true,
    });
  }

  const member = interaction.guild.members.cache.get(interaction.user.id);

  if (
    !member ||
    (!member.permissions.has("ManageMessages") &&
      !member.permissions.has("Administrator"))
  ) {
    return interaction.reply({
      content: "You don't have the permissions to use this command",
      ephemeral: true,
    });
  }

  if (!count) {
    return interaction.reply({
      content: "Delete count is missing",
      ephemeral: true,
    });
  }

  if (count < 1 || count > 100) {
    return interaction.reply({
      content: "Delete count has to be between 1 and 100",
      ephemeral: true,
    });
  }

  const messages = await interaction.channel.messages.fetch({ limit: count });
  const messageCount = messages.size;

  if (messageCount) await interaction.channel.bulkDelete(messages);
  await interaction.reply({
    content: `${messageCount} messages deleted`,
    ephemeral: true,
  });
};

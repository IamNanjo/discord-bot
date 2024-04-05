import type { ChatInputCommandInteraction } from "discord.js";
import type { CommandOptions } from "../types";

export const description =
  "Flips a coin and replies with either heads or tails";
export const options: CommandOptions[] = [];

export const run = (interaction: ChatInputCommandInteraction) => {
  var chance = Math.floor(Math.random() * 2);
  let result = "Tails!";

  if (chance === 0) {
    result = "Heads!";
  }

  interaction.reply({ content: `Your coin landed on ${result}` });
};

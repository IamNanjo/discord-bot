import { ButtonInteraction, Client, GatewayIntentBits } from "discord.js";

import getToken from "./token";
import registerCommands from "./register";
import { importCommands, importEvents } from "./imports";

const token = getToken();
const commands = await importCommands();
const events = await importEvents();
await registerCommands(token, commands);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
	console.log(`\n${client.user?.displayName} is ready\n`);
});

client.on("interactionCreate", (interaction) => {
	if ("customId" in interaction && interaction.customId in events) {
		return events[interaction.customId](interaction);
	}

	if (
		!interaction.isChatInputCommand() ||
		!(interaction.commandName in commands)
	) {
		return;
	}

	commands[interaction.commandName].run(interaction);
});

client.login(token);

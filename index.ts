import { Client, GatewayIntentBits } from "discord.js";

import getToken from "./token";
import registerCommands from "./register";
import { importCommands } from "./imports";

const token = getToken();
const commands = await importCommands();
await registerCommands(token, commands);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
	console.log(`\n${client.user?.displayName} is ready`);
});

client.on("interactionCreate", async (interaction) => {
	if (
		!interaction.isChatInputCommand() ||
		!(interaction.commandName in commands)
	) {
		console.log(interaction);
		return;
	}

	await commands[interaction.commandName].run(interaction);
});

client.login(token);

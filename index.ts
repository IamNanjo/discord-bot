import { Client, GatewayIntentBits } from "discord.js";

import getToken from "./token";
import registerCommands from "./register";
import db from "./db";
import { importCommands, importEvents } from "./imports";

const token = getToken();
const commands = await importCommands();
const events = await importEvents();
if (process.argv.at(-1) === "--register")
	await registerCommands(token, commands);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
	console.log(`${client.user?.displayName} is ready\n`);
});

// Add and remove guilds from db on join and leave
client.on("guildCreate", async (guild) => {
	await db.chat.upsert({
		where: { id: guild.id },
		create: { id: guild.id },
		update: {}
	});
});
client.on("guildDelete", async (guild) => {
	await db.chat.delete({ where: { id: guild.id } });
});

client.on("interactionCreate", (interaction) => {
	if ("customId" in interaction) {
		const eventDetails = interaction.customId.split(":");
		const eventName = eventDetails[0];
		const eventArgs = eventDetails.slice(1);
		const event = events[eventName];

		if (eventName in events)
			return eventArgs.length
				? event(interaction, eventArgs)
				: event(interaction);
	}

	if (interaction.isChatInputCommand() && interaction.commandName in commands)
		return commands[interaction.commandName].run(interaction);
});

client.login(token);

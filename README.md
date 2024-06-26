# Discord Bot

[Invite link](https://discord.com/api/oauth2/authorize?client_id=838342857001533471&permissions=3155968&scope=bot)

This Discord bot has very basic features,
such as bulk deletion of messages,
getting information about users,
fetching definitions from urban dictionary and ~~images from reddit~~.
The bot is made using [discord.js](https://discord.js.org/).

For development I use [Bun](https://bun.sh/) for faster package installs,
support for executing TypeScript and better performance.
I also use [PM2](https://pm2.keymetrics.io/) for the production environment
to make sure the bot stays online at all times.

## Reddit Command

The Reddit command is now broken after Reddit restricted access to their API and
therefore it was removed from the bot's commands.

This also removed the need for a database, so that has been removed as well.

Latest commit with Reddit command: [7b9bd81294b14b7206a7b49f99fa02842b7a8542](https://github.com/IamNanjo/discord-bot/tree/7b9bd81294b14b7206a7b49f99fa02842b7a8542)

## Screenshots

![Basic commands](screenshots/basic-commands.png)
![Message deletion](screenshots/message-deletion.png)

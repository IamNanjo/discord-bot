module.exports = {
	apps: [
		{
			name: "discord-bot",
			script: "index.ts",
			interpreter: "~/.bun/bin/bun",
			instances: "max",
			exec_mode: "cluster",
            watch: [
                "imports.ts",
                "index.ts",
                "register.ts",
                "token.ts",
                "types.ts",
                "commands/*.ts"
            ]
		}
	]
};

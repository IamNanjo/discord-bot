type CommandType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * Type: 1=sub-command, 2=sub-command group, 3=string, 4=integer, 5=boolean, 6=user, 7=channel, 8=role, 9=mentionable, 10=double, 11=attachment)
 */
export interface CommandOptions {
	name: string;
	description: string;
	type: CommandType;
	required: boolean;
	choices?: { name: string; value: string | number }[];
}

import { CommandSourceType, ICommand } from "@widy/sdk";

const resetCommand = (command: ICommand): ICommand => {
	return {
		id: command.id,
		name: command.name,
		description: command.description,
		source_type: CommandSourceType.None,
		is_enabled: command.is_enabled,
	};
};
export default resetCommand;

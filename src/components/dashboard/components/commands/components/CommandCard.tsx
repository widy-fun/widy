import type { ICommand } from "@widy/sdk";

const CommandCard = ({ command }: { command: ICommand }) => {
	return <>{command.name}</>;
};
export default CommandCard;

import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import type { AppState } from "../../../../../store";
import CommandSourceCard from "./CommandSourceCard";

const CommandAction = () => {
	const { command } = useSelector((state: AppState) => state.commandsState);
	return (
		<Box
			sx={{
				display: "flex",
				gap: 1,
				flexWrap: "wrap",
				placeContent: "center",
			}}
		>
			<CommandSourceCard
				title="ChatBot"
				description=""
				path="commands/action/chat-bot"
				isActive={!!command.action.chat_bot}
			/>
			<CommandSourceCard
				title="Alert"
				description=""
				path="commands/action/alert"
				isActive={!!command.action.alert}
			/>
		</Box>
	);
};
export default CommandAction;

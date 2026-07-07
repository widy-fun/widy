import { Box } from "@mui/material";
import { CommandSourceType } from "@widy/sdk";
import { useSelector } from "react-redux";
import type { AppState } from "../../../../../store";
import CommandSourceCard from "./CommandSourceCard";

const CommandSource = () => {
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
				title={CommandSourceType.Chat}
				description=""
				path="commands/source/chat"
				isActive={command.source_type === CommandSourceType.Chat}
			/>
			<CommandSourceCard
				title={CommandSourceType.Custom}
				description=""
				path="commands/source/custom"
				isActive={command.source_type === CommandSourceType.Custom}
			/>
		</Box>
	);
};
export default CommandSource;

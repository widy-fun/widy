import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import { Box } from "@mui/material";
import { CommandSourceType } from "@widy/sdk";
import { useSelector } from "react-redux";
import type { AppState } from "../../../../../store";
import CommandSourceActionCard from "./CommandSourceActionCard";

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
			<CommandSourceActionCard
				title={CommandSourceType.Chat}
				description="Chat source"
				path="/dashboard/commands/source/chat"
				selected={!!command.chat}
				icon={<SmsFailedIcon sx={{ width: 40, height: 40 }} />}
			/>
			<CommandSourceActionCard
				title={CommandSourceType.Timer}
				description="Timers source"
				path="/dashboard/commands/source/timer"
				selected={!!command.timer}
				icon={<AccessAlarmIcon sx={{ width: 40, height: 40 }} />}
			/>
		</Box>
	);
};
export default CommandSource;

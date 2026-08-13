import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { AppState } from "../../../../../store";
import CommandSourceActionCard from "./CommandSourceActionCard";

const CommandSource = () => {
	const { command } = useSelector((state: AppState) => state.commandsState);
	const { t } = useTranslation();

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
				title={t("chat_source.title")}
				description={t("chat_source.description")}
				path="/dashboard/commands/source/chat"
				selected={!!command.chat_source}
				icon={<SmsFailedIcon sx={{ width: 40, height: 40 }} />}
			/>
			<CommandSourceActionCard
				title={t("timer_source.title")}
				description={t("timer_source.description")}
				path="/dashboard/commands/source/timer"
				selected={!!command.timer_source}
				icon={<AccessAlarmIcon sx={{ width: 40, height: 40 }} />}
			/>
		</Box>
	);
};
export default CommandSource;

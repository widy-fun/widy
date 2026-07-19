import CampaignIcon from "@mui/icons-material/Campaign";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useGetAlertByIdQuery } from "../../../../../api/alertsApi";
import type { AppState } from "../../../../../store";
import CommandSourceActionCard from "./CommandSourceActionCard";

const CommandAction = ({ isUpdate }: { isUpdate: boolean }) => {
	const { command } = useSelector((state: AppState) => state.commandsState);
	const { data } = useGetAlertByIdQuery({ id: command.alert?.id });
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
				title={t("chat_bot_action.title")}
				description={t("chat_bot_action.description")}
				path="/dashboard/commands/action/chat-bot"
				icon={<SmartToyIcon sx={{ width: 40, height: 40 }} />}
				selected={!!command.chat_bot}
			/>
			<CommandSourceActionCard
				title={t("alert_action.title")}
				description={t("alert_action.description")}
				path={
					isUpdate && data
						? "/dashboard/commands/action/alert/update"
						: "/dashboard/commands/action/alert/create"
				}
				icon={<CampaignIcon sx={{ width: 40, height: 40 }} />}
				selected={!!command.alert}
			/>
		</Box>
	);
};
export default CommandAction;

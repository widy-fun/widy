import CampaignIcon from "@mui/icons-material/Campaign";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Box } from "@mui/material";
import { ServiceType } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useGetAlertByIdQuery } from "../../../../../api/alertsApi";
import type { AppState } from "../../../../../store";
import WheelIcon from "../../auction/components/WheelIcon";
import CommandSourceActionCard from "./CommandSourceActionCard";

const CommandActions = ({ isUpdate }: { isUpdate: boolean }) => {
	const { services } = useSelector((state: AppState) => state.servicesState);
	const { command } = useSelector((state: AppState) => state.commandsState);
	const { data } = useGetAlertByIdQuery(
		{ id: command.alert?.id },
		{ skip: !command.alert },
	);
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
				selected={!!command.chat_bot_action}
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
			<CommandSourceActionCard
				title={t("tts.title")}
				description={t("tts.description")}
				path="/dashboard/commands/action/tts"
				icon={<VolumeUpIcon sx={{ width: 40, height: 40 }} />}
				selected={!!command.tts_settings}
			/>
			<CommandSourceActionCard
				title={t("auction_action.title")}
				description={t("auction_action.description")}
				path="/dashboard/commands/action/auction"
				icon={<WheelIcon size={40} />}
				selected={!!command.auction_action}
			/>
			<CommandSourceActionCard
				title={t("kick_action.title")}
				description={t("kick_action.description")}
				path="/dashboard/commands/action/kick"
				icon={
					<Box
						component="img"
						src={services[ServiceType.Kick].image}
						alt=""
						sx={{
							width: 40,
							height: 40,
							objectFit: "contain",
							borderRadius: 1,
							backgroundColor: "white",
							padding: "4px",
						}}
					/>
				}
				selected={!!command.kick_action}
			/>
			<CommandSourceActionCard
				title={t("twitch_action.title")}
				description={t("twitch_action.description")}
				path="/dashboard/commands/action/twitch"
				icon={
					<Box
						component="img"
						src={services[ServiceType.Twitch].image}
						alt=""
						sx={{
							width: 40,
							height: 40,
							objectFit: "contain",
							borderRadius: 1,
							backgroundColor: "white",
							padding: "4px",
						}}
					/>
				}
				selected={!!command.twitch_action}
			/>
			<CommandSourceActionCard
				title={t("telegram_bot_action.title")}
				description={t("telegram_bot_action.description")}
				path="/dashboard/commands/action/telegram-bot"
				icon={
					<Box
						component="img"
						src={services[ServiceType.TelegramBot].image}
						alt=""
						sx={{
							width: 40,
							height: 40,
							objectFit: "contain",
							borderRadius: 1,
							backgroundColor: "white",
							padding: "4px",
						}}
					/>
				}
				selected={!!command.telegram_bot_action}
			/>
		</Box>
	);
};
export default CommandActions;

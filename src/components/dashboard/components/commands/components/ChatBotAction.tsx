import {
	Checkbox,
	ListItemText,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	CommandSourceType,
	Platform,
	ServiceType,
} from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetServiceByIdQuery } from "../../../../../api/servicesApi";
import { DEFAULT_CHAT_BOT_ACTION } from "../../../../../constants";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import OnOffSwitch from "../../../../OnOffSwitch";
import VariablesAdornment from "../../../../VariablesAdornment";
import styles from "../../settings/Settings.module.css";

const ChatBotAction = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [chatBotAction, setChatBotAction] = useState(DEFAULT_CHAT_BOT_ACTION);
	const { data: twitchBotService } = useGetServiceByIdQuery({
		id: ServiceType.TwitchBot,
	});
	const { data: kickBotService } = useGetServiceByIdQuery({
		id: ServiceType.KickBot,
	});

	useEffect(() => {
		if (command.chat_bot_action) {
			setChatBotAction(command.chat_bot_action);
		}
	}, [command.chat_bot_action]);

	return (
		<>
			<h1>{t("chat_bot_action.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					{!command.timer_source && (
						<>
							<div className={styles.settings}>
								<div className={styles.label}>
									<span>{t("chat_bot_action.message")}:</span>
								</div>
								<TextField
									value={chatBotAction.message}
									onChange={(e) => {
										setChatBotAction({
											...chatBotAction,
											message: e.target.value,
										});
									}}
									slotProps={{
										input: {
											endAdornment: <VariablesAdornment />,
										},
									}}
								/>
							</div>
							<div className={styles.settings}>
								<div className={styles.label}>
									<span>{t("chat_bot_action.replay")}:</span>
								</div>
								<OnOffSwitch
									checked={chatBotAction.replay}
									onChange={(_, checked) =>
										setChatBotAction({ ...chatBotAction, replay: checked })
									}
								/>
							</div>
						</>
					)}
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("chat_source.platforms")}:</span>
						</div>
						<Select
							sx={{ width: 250 }}
							multiple
							value={chatBotAction.platforms}
							onChange={(e) => {
								setChatBotAction({
									...chatBotAction,
									platforms: e.target.value as Platform[],
								});
							}}
							renderValue={(selected) => selected.join(", ")}
						>
							{Object.values(Platform).map((platform) => (
								<MenuItem key={platform} value={platform}>
									<Checkbox
										checked={chatBotAction.platforms.includes(platform)}
									/>
									<ListItemText primary={platform} />
								</MenuItem>
							))}
						</Select>
					</div>

					<LeftRightButtons
						onLeft={() => {
							if (
								chatBotAction.platforms.includes(Platform.Kick) &&
								!kickBotService?.authorized
							) {
								dispatch(
									showSnackBar({
										message: t("command.you_need_connect_first", {
											service: ServiceType.KickBot,
										}),
										alertSeverity: AlertSeverity.warning,
									}),
								);
								return;
							}
							if (
								chatBotAction.platforms.includes(Platform.Twitch) &&
								!twitchBotService?.authorized
							) {
								dispatch(
									showSnackBar({
										message: t("command.you_need_connect_first", {
											service: ServiceType.TwitchBot,
										}),
										alertSeverity: AlertSeverity.warning,
									}),
								);
								return;
							}
							if (command.source_type === CommandSourceType.None) {
								dispatch(
									showSnackBar({
										message: t("command.select_source_first"),
										alertSeverity: AlertSeverity.warning,
									}),
								);
								return;
							}

							if (
								command.source_type === CommandSourceType.Chat ||
								command.source_type === CommandSourceType.Timer
							) {
								dispatch(
									setCommand({
										...command,
										chat_bot_action: chatBotAction,
									}),
								);
								navigate(-1);
							} else {
								dispatch(
									showSnackBar({
										message: t("command.not_work_with_selected_source"),
										alertSeverity: AlertSeverity.warning,
									}),
								);
							}
						}}
						OnRight={() => {
							dispatch(
								setCommand({
									...command,
									chat_bot_action: undefined,
								}),
							);
							navigate(-1);
						}}
						leftText={t("ok")}
						rightText={t("cancel")}
					/>
				</div>
			</div>
		</>
	);
};
export default ChatBotAction;

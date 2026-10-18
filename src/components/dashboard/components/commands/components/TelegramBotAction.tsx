import { TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import { AlertSeverity, CommandSourceType, ServiceType } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetServiceByIdQuery } from "../../../../../api/servicesApi";
import { DEFAULT_TELEGRAM_BOT_ACTION } from "../../../../../constants";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import VariablesAdornment from "../../../../VariablesAdornment";
import styles from "../../settings/Settings.module.css";

const TelegramBotAction = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [telegramBotAction, setTelegramBotAction] = useState(
		DEFAULT_TELEGRAM_BOT_ACTION,
	);
	const { data: telegramBotService } = useGetServiceByIdQuery({
		id: ServiceType.TelegramBot,
	});

	useEffect(() => {
		if (command.telegram_bot_action) {
			setTelegramBotAction(command.telegram_bot_action);
		}
	}, [command.telegram_bot_action]);

	return (
		<>
			<h1>{t("telegram_bot_action.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("telegram_bot_action.channel")}:</span>
						</div>
						<TextField
							value={telegramBotAction.channel}
							onChange={(e) => {
								setTelegramBotAction({
									...telegramBotAction,
									channel: e.target.value,
								});
							}}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("telegram_bot_action.message")}:</span>
						</div>
						<TextField
							multiline
							minRows={2}
							maxRows={4}
							slotProps={{
								htmlInput: { maxLength: 200 },
								input: {
									endAdornment: <VariablesAdornment />,
								},
							}}
							value={telegramBotAction.message}
							onChange={(e) => {
								setTelegramBotAction({
									...telegramBotAction,
									message: e.target.value,
								});
							}}
						/>
					</div>
					<LeftRightButtons
						onLeft={() => {
							if (!telegramBotService?.authorized) {
								dispatch(
									showSnackBar({
										message: t("command.you_need_connect_first", {
											service: ServiceType.TelegramBot,
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
								command.source_type === CommandSourceType.Kick ||
								command.source_type === CommandSourceType.Twitch
							) {
								dispatch(
									setCommand({
										...command,
										telegram_bot_action: telegramBotAction,
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
									telegram_bot_action: undefined,
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
export default TelegramBotAction;

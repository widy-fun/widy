import { MenuItem, Select, TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	CommandSourceType,
	ServiceType,
	TwitchActionType,
	TwitchSourceType,
} from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetServiceByIdQuery } from "../../../../../api/servicesApi";
import { DEFAULT_TWITCH_ACTION } from "../../../../../constants";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import VariablesAdornment from "../../../../VariablesAdornment";
import styles from "../../settings/Settings.module.css";

const TwitchAction = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [twitchAction, setTwitchAction] = useState(DEFAULT_TWITCH_ACTION);
	const { data: twitchService } = useGetServiceByIdQuery({
		id: ServiceType.Twitch,
	});

	useEffect(() => {
		if (command.twitch_action) {
			setTwitchAction(command.twitch_action);
		}
	}, [command.twitch_action]);

	return (
		<>
			<h1>{t("twitch_action.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("twitch_action.type")}:</span>
						</div>
						<Select sx={{ width: 150 }} value={twitchAction.type}>
							{Object.values(TwitchActionType).map((type) => (
								<MenuItem
									value={type}
									key={type}
									onClick={() => {
										setTwitchAction({
											...twitchAction,
											type,
										});
									}}
								>
									{t(`twitch_action.${type}`)}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("twitch_action.message")}:</span>
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
							value={twitchAction.target.message}
							onChange={(e) => {
								setTwitchAction({
									...twitchAction,
									target: { message: e.target.value },
								});
							}}
						/>
					</div>
					<LeftRightButtons
						onLeft={() => {
							if (!twitchService?.authorized) {
								dispatch(
									showSnackBar({
										message: t("command.you_need_connect_first", {
											service: ServiceType.Twitch,
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
								command.twitch_source?.type === TwitchSourceType.StreamStarted
							) {
								dispatch(
									setCommand({
										...command,
										twitch_action: twitchAction,
									}),
								);
								navigate(-1);
							} else {
								dispatch(
									showSnackBar({
										message: t("command.work_with_type", {
											type: t(
												`twitch_source.${TwitchSourceType.StreamStarted}`,
											),
											source: CommandSourceType.Twitch,
										}),
										alertSeverity: AlertSeverity.warning,
									}),
								);
							}
						}}
						OnRight={() => {
							dispatch(
								setCommand({
									...command,
									twitch_action: undefined,
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
export default TwitchAction;

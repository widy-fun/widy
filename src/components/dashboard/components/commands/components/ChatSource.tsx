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
	UserLevel,
} from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetServiceByIdQuery } from "../../../../../api/servicesApi";
import { DEFAULT_CHAT_SOURCE } from "../../../../../constants";
import resetCommand from "../../../../../helpers/resetCommand";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import styles from "../../settings/Settings.module.css";

const ChatSource = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [chatSource, setChatSource] = useState(DEFAULT_CHAT_SOURCE);
	const { data: twitchService } = useGetServiceByIdQuery({
		id: ServiceType.Twitch,
	});
	const { data: kickService } = useGetServiceByIdQuery({
		id: ServiceType.Kick,
	});

	useEffect(() => {
		if (command.chat_source) {
			setChatSource(command.chat_source);
		}
	}, [command.chat_source]);

	return (
		<>
			<h1>{t("chat_source.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("chat_source.trigger")}:</span>
						</div>
						<TextField
							value={chatSource.trigger}
							onChange={(e) => {
								setChatSource({
									...chatSource,
									trigger: e.target.value,
								});
							}}
						/>
					</div>

					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("chat_source.platforms")}:</span>
						</div>
						<Select
							sx={{ width: 250 }}
							multiple
							value={chatSource.platforms}
							onChange={(e) => {
								setChatSource({
									...chatSource,
									platforms: e.target.value as Platform[],
								});
							}}
							renderValue={(selected) => selected.join(", ")}
						>
							{Object.values(Platform).map((platform) => (
								<MenuItem key={platform} value={platform}>
									<Checkbox checked={chatSource.platforms.includes(platform)} />
									<ListItemText primary={platform} />
								</MenuItem>
							))}
						</Select>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("chat_source.user_levels")}:</span>
						</div>
						<Select
							sx={{ width: 250 }}
							multiple
							value={chatSource.user_levels}
							onChange={(e) => {
								setChatSource({
									...chatSource,
									user_levels: e.target.value as UserLevel[],
								});
							}}
							renderValue={(selected) => selected.join(", ")}
						>
							{Object.values(UserLevel).map((userLevel) => (
								<MenuItem key={userLevel} value={userLevel}>
									<Checkbox
										checked={chatSource.user_levels.includes(userLevel)}
									/>
									<ListItemText primary={userLevel} />
								</MenuItem>
							))}
						</Select>
					</div>
					<LeftRightButtons
						onLeft={() => {
							if (
								chatSource.platforms.includes(Platform.Kick) &&
								!kickService?.authorized
							) {
								dispatch(
									showSnackBar({
										message: t("command.you_need_connect_first", {
											service: ServiceType.Kick,
										}),
										alertSeverity: AlertSeverity.warning,
									}),
								);
								return;
							}
							if (
								chatSource.platforms.includes(Platform.Twitch) &&
								!twitchService?.authorized
							) {
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
							dispatch(
								setCommand({
									chat_source: chatSource,
									source_type: CommandSourceType.Chat,
									id: command.id,
									name: command.name,
									description: command.description,
									is_enabled: command.is_enabled,
								}),
							);
							navigate(-1);
						}}
						OnRight={() => {
							dispatch(setCommand(resetCommand(command)));
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
export default ChatSource;

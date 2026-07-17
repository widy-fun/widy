import {
	Checkbox,
	ListItemText,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { CommandSourceType, Platform, UserLevel } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DEFAULT_CHAT_SOURCE } from "../../../../../constants";
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

	useEffect(() => {
		if (command.chat) {
			setChatSource(command.chat);
		}
	}, [command.chat]);

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
							dispatch(
								setCommand({
									...command,
									chat: chatSource,
									timer: undefined,
									source_type: CommandSourceType.Chat,
								}),
							);
							navigate(-1);
						}}
						OnRight={() => {
							dispatch(
								setCommand({
									...command,
									chat: undefined,
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
export default ChatSource;

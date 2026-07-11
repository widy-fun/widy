import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DEFAULT_CHAT_BOT_ACTION } from "../../../../../constants";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import OnOffSwitch from "../../../../OnOffSwitch";
import styles from "../../settings/Settings.module.css";

const ChatBotAction = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [chatBotAction, setChatBotAction] = useState(DEFAULT_CHAT_BOT_ACTION);

	return (
		<>
			<h1>{t("chat_bot_action.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("chat_bot_action.text")}:</span>
						</div>
						<TextField
							value={chatBotAction.message}
							onChange={(e) => {
								setChatBotAction({ ...chatBotAction, message: e.target.value });
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

					<div style={{ display: "flex", placeContent: "center" }}>
						<Button
							variant="contained"
							onClick={() => {
								dispatch(
									setCommand({
										...command,
										chat_bot: chatBotAction,
									}),
								);
								navigate(-1);
							}}
						>
							{t("ok")}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
export default ChatBotAction;

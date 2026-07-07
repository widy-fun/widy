import { Button, TextField } from "@mui/material";
import type { ICustomSource } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import styles from "../../settings/Settings.module.css";

const ChatBotAction = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
							value={(command.source as ICustomSource).text}
							onChange={(e) => {
								dispatch(
									setCommand({
										...command,
										action: { chat_bot: { message: e.target.value } },
									}),
								);
							}}
						/>
					</div>

					<div style={{ display: "flex", placeContent: "center" }}>
						<Button
							variant="contained"
							onClick={() => {
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

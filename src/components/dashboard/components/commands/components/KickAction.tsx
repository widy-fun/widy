import { MenuItem, Select, TextField } from "@mui/material";
import { KickActionType } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DEFAULT_KICK_ACTION } from "../../../../../constants";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import styles from "../../settings/Settings.module.css";

const KickAction = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [kickAction, setKickAction] = useState(DEFAULT_KICK_ACTION);

	useEffect(() => {
		if (command.kick_action) {
			setKickAction(command.kick_action);
		}
	}, [command.kick_action]);

	return (
		<>
			<h1>{t("kick_action.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("kick_action.type")}:</span>
						</div>
						<Select sx={{ width: 150 }} value={kickAction.type}>
							{Object.values(KickActionType).map((type) => (
								<MenuItem
									value={type}
									key={type}
									onClick={() => {
										setKickAction({
											...kickAction,
											type,
										});
									}}
								>
									{t(`kick_action.${type}`)}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("kick_action.message")}:</span>
						</div>
						<TextField
							multiline
							minRows={2}
							maxRows={4}
							slotProps={{ htmlInput: { maxLength: 200 } }}
							value={kickAction.target.message}
							onChange={(e) => {
								setKickAction({
									...kickAction,
									target: { message: e.target.value },
								});
							}}
						/>
					</div>
					<LeftRightButtons
						onLeft={() => {
							dispatch(
								setCommand({
									...command,
									kick_action: kickAction,
								}),
							);
							navigate(-1);
						}}
						OnRight={() => {
							dispatch(
								setCommand({
									...command,
									kick_action: undefined,
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
export default KickAction;

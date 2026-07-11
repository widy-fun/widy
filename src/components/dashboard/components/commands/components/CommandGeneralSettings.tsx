import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import styles from "../../settings/Settings.module.css";

const CommandGeneralSettings = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { command } = useSelector((state: AppState) => state.commandsState);

	return (
		<div
			style={{
				display: "grid",
				placeItems: "center",
			}}
		>
			<div className={styles.settingsContainer}>
				<div className={styles.settings}>
					<div className={styles.label}>
						<span>{t("command.name")}:</span>
					</div>
					<TextField
						value={command.name}
						onChange={(e) => {
							dispatch(setCommand({ ...command, name: e.target.value }));
						}}
					/>
				</div>
				<div className={styles.settings}>
					<div className={styles.label}>
						<span>{t("command.description")}:</span>
					</div>
					<TextField
						value={command.description}
						onChange={(e) => {
							dispatch(setCommand({ ...command, description: e.target.value }));
						}}
					/>
				</div>
			</div>
		</div>
	);
};
export default CommandGeneralSettings;

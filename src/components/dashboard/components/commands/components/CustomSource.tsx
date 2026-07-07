import { Button, TextField } from "@mui/material";
import { CommandSourceType, type ICustomSource } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import styles from "../../settings/Settings.module.css";

const CustomSource = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			<h1>{t("custom_source.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("custom_source.text")}:</span>
						</div>
						<TextField
							value={(command.source as ICustomSource).text}
							onChange={(e) => {
								dispatch(
									setCommand({
										...command,
										source: { text: e.target.value },
										source_type: CommandSourceType.Custom,
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
export default CustomSource;

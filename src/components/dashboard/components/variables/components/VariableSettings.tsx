import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { AppState } from "../../../../../store";
import { setVariable } from "../../../../../store/slices/variablesSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import styles from "../../settings/Settings.module.css";

const VariableSettings = ({ onSave }: { onSave: () => void }) => {
	const { t } = useTranslation();
	const { variable } = useSelector((state: AppState) => state.variablesState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			<h3 style={{ height: 20 }}>{variable.name.toUpperCase()}</h3>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("variable.name")}:</span>
						</div>
						<TextField
							variant="outlined"
							value={variable.name}
							slotProps={{
								htmlInput: {
									maxLength: 30,
								},
							}}
							onChange={(e) => {
								dispatch(
									setVariable({
										...variable,
										name: e.target.value,
									}),
								);
							}}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("variable.description")}:</span>
						</div>
						<TextField
							variant="outlined"
							value={variable.description}
							multiline
							slotProps={{
								htmlInput: {
									maxLength: 90,
								},
							}}
							onChange={(e) => {
								dispatch(
									setVariable({
										...variable,
										description: e.target.value,
									}),
								);
							}}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("variable.value")}:</span>
						</div>
						<TextField
							variant="outlined"
							value={variable.value}
							multiline
							onChange={(e) => {
								dispatch(
									setVariable({
										...variable,
										value: e.target.value,
									}),
								);
							}}
						/>
					</div>
					<LeftRightButtons
						onLeft={onSave}
						OnRight={() => {
							navigate(-1);
						}}
						leftText={t("save")}
						rightText={t("back")}
					/>
				</div>
			</div>
		</>
	);
};
export default VariableSettings;

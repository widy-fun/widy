import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { AppState } from "../../../../../store";
import { setModerator } from "../../../../../store/slices/moderatorsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import styles from "../../settings/Settings.module.css";

const ModeratorSettings = ({ onSave }: { onSave: () => void }) => {
	const { t } = useTranslation();
	const { moderator } = useSelector((state: AppState) => state.moderatorsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			<h3 style={{ height: 20 }}>{moderator.name.toUpperCase()}</h3>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("moderator.name")}:</span>
						</div>
						<TextField
							variant="outlined"
							autoComplete="off"
							value={moderator.name}
							slotProps={{
								htmlInput: {
									maxLength: 100,
								},
							}}
							onChange={(e) => {
								dispatch(
									setModerator({
										...moderator,
										name: e.target.value,
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
export default ModeratorSettings;

import { MenuItem, Select } from "@mui/material";
import { CommandSourceType, KickSourceType } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DEFAULT_KICK_SOURCE } from "../../../../../constants";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import styles from "../../settings/Settings.module.css";

const KickSource = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [kickSource, setKickSource] = useState(DEFAULT_KICK_SOURCE);

	useEffect(() => {
		if (command.kick_source) {
			setKickSource(command.kick_source);
		}
	}, [command.kick_source]);

	return (
		<>
			<h1>{t("kick_source.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("kick_source.type")}:</span>
						</div>
						<Select sx={{ width: 150 }} value={kickSource.type}>
							{Object.values(KickSourceType).map((type) => (
								<MenuItem
									value={type}
									key={type}
									onClick={() => {
										setKickSource({
											type,
										});
									}}
								>
									{t(`kick_source.${type}`)}
								</MenuItem>
							))}
						</Select>
					</div>

					<LeftRightButtons
						onLeft={() => {
							dispatch(
								setCommand({
									...command,
									kick_source: kickSource,
									timer_source: undefined,
									chat_source: undefined,
									source_type: CommandSourceType.Kick,
								}),
							);
							navigate(-1);
						}}
						OnRight={() => {
							dispatch(
								setCommand({
									...command,
									kick_source: undefined,
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
export default KickSource;

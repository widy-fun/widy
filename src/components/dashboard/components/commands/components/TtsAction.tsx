import { TtsType } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import getDefaultTtsSettingsByType from "../../../../../helpers/getDefaultTtsSettingsByType";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import TtsSettings from "../../../../TtsSettings";
import styles from "../../settings/Settings.module.css";

const TtsAction = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [ttsSettings, setTtsSettings] = useState(
		getDefaultTtsSettingsByType(TtsType.Piper),
	);

	useEffect(() => {
		if (command.tts_settings) {
			setTtsSettings(command.tts_settings);
		}
	}, [command.tts_settings]);

	return (
		<>
			<h1>{t("tts_action.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<TtsSettings
						tts_settings={ttsSettings}
						onSettingsChange={(tts_settings) => {
							dispatch(
								setCommand({
									...command,
									tts_settings,
								}),
							);
						}}
					/>

					<LeftRightButtons
						onLeft={() => {
							dispatch(
								setCommand({
									...command,
									tts_settings: ttsSettings,
								}),
							);
							navigate(-1);
						}}
						OnRight={() => {
							dispatch(
								setCommand({
									...command,
									tts_settings: undefined,
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
export default TtsAction;

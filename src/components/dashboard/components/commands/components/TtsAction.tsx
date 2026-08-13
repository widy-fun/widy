import type { IPiperTtsSettings } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DEFAULT_TTS_ACTION } from "../../../../../constants";
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
	const [ttsAction, setTtsAction] = useState(DEFAULT_TTS_ACTION);

	useEffect(() => {
		if (command.tts_action) {
			setTtsAction(command.tts_action);
		}
	}, [command.tts_action]);

	return (
		<>
			<h1>{t("tts_action.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<TtsSettings
						tts_type={ttsAction.tts_type}
						onTtsTypeChange={(tts_type) => {
							dispatch(
								setCommand({
									...command,
									tts_action: {
										tts_type,
										tts_settings: getDefaultTtsSettingsByType(tts_type),
										tts_volume: ttsAction.tts_volume,
									},
								}),
							);
						}}
						tts_volume={ttsAction.tts_volume}
						onTtsVolumeChange={(tts_volume) => {
							dispatch(
								setCommand({
									...command,
									tts_action: { ...ttsAction, tts_volume },
								}),
							);
						}}
						voices={
							ttsAction.tts_settings
								? (ttsAction.tts_settings as IPiperTtsSettings).voices
								: {}
						}
						onVoicesChange={(voices) => {
							dispatch(
								setCommand({
									...command,
									tts_action: { ...ttsAction, tts_settings: { voices } },
								}),
							);
						}}
					/>

					<LeftRightButtons
						onLeft={() => {
							dispatch(
								setCommand({
									...command,
									tts_action: ttsAction,
								}),
							);
							navigate(-1);
						}}
						OnRight={() => {
							dispatch(
								setCommand({
									...command,
									tts_action: undefined,
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

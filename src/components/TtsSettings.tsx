import { MenuItem, Select, Typography } from "@mui/material";
import { type ITtsSettings, ServiceType, TtsType } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useGetServiceByIdQuery } from "../api/servicesApi";
import getDefaultTtsSettingsByType from "../helpers/getDefaultTtsSettingsByType";
import getTtsNoteByTtsType from "../helpers/getTtsNoteByTtsType";
import styles from "./dashboard/components/settings/Settings.module.css";
import FishAudioSettings from "./FishAudioSettings";
import InputSlider from "./InputSlider";
import PiperSettings from "./PiperSettings";

const TtsSettings = ({
	tts_settings,
	onSettingsChange,
}: {
	tts_settings: ITtsSettings;
	onSettingsChange: (tts_settings: ITtsSettings) => void;
}) => {
	const { t } = useTranslation();
	const { data: fishAudioService } = useGetServiceByIdQuery({
		id: ServiceType.FishAudio,
	});

	return (
		<>
			<div className={styles.settings}>
				<div className={styles.label}>
					<Typography>
						{t("settings.tts_type")}{" "}
						<span style={{ fontSize: 12 }}>
							({getTtsNoteByTtsType(tts_settings.type)})
						</span>
						:
					</Typography>
				</div>
				<Select sx={{ width: 150 }} value={tts_settings.type}>
					{Object.values(TtsType).map((type) => (
						<MenuItem
							value={type}
							key={type}
							onClick={() => {
								onSettingsChange(getDefaultTtsSettingsByType(type));
							}}
						>
							{type}
						</MenuItem>
					))}
				</Select>
			</div>

			<div className={styles.settings}>
				<div className={styles.label}>
					<span>{t("tts_volume")}:</span>
				</div>
				<InputSlider
					sliderValue={tts_settings.volume}
					inputValue={tts_settings.volume}
					onChange={(volume) => {
						onSettingsChange({ ...tts_settings, volume });
					}}
					min={0}
					sliderMax={100}
					inputMax={100}
					adornmentText={"%"}
				/>
			</div>
			{tts_settings.type === TtsType.Piper && (
				<div style={{ display: "flex", placeContent: "center" }}>
					<PiperSettings
						onSettingsChange={onSettingsChange}
						tts_settings={tts_settings}
					/>
				</div>
			)}
			{tts_settings.type === TtsType.FishAudio && (
				<div style={{ display: "flex", placeContent: "center" }}>
					{fishAudioService?.authorized && (
						<FishAudioSettings
							onSettingsChange={onSettingsChange}
							tts_settings={tts_settings}
						/>
					)}
				</div>
			)}
		</>
	);
};
export default TtsSettings;

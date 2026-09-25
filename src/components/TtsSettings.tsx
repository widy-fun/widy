import { MenuItem, Select, Typography } from "@mui/material";
import { type ITtsSettings, ServiceType, TtsType } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useGetServiceByIdQuery } from "../api/servicesApi";
import getTtsNoteByTtsType from "../helpers/getTtsNoteByTtsType";
import styles from "./dashboard/components/settings/Settings.module.css";
import FishAudioSettings from "./FishAudioSettings";
import InputSlider from "./InputSlider";
import PiperSettings from "./PiperSettings";

const TtsSettings = ({
	tts_type,
	onTtsTypeChange,
	tts_volume,
	onTtsVolumeChange,
	settings,
	onSettingsChange,
}: {
	tts_type: TtsType;
	onTtsTypeChange: (tts_type: TtsType) => void;
	tts_volume: number;
	onTtsVolumeChange: (tts_volume: number) => void;
	settings: ITtsSettings;
	onSettingsChange: (settings: ITtsSettings) => void;
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
							({getTtsNoteByTtsType(tts_type)})
						</span>
						:
					</Typography>
				</div>
				<Select sx={{ width: 150 }} value={tts_type}>
					{Object.values(TtsType).map((tts_type) => (
						<MenuItem
							value={tts_type}
							key={tts_type}
							onClick={() => {
								onTtsTypeChange(tts_type);
							}}
						>
							{tts_type}
						</MenuItem>
					))}
				</Select>
			</div>

			<div className={styles.settings}>
				<div className={styles.label}>
					<span>{t("tts_volume")}:</span>
				</div>
				<InputSlider
					sliderValue={tts_volume}
					inputValue={tts_volume}
					onChange={onTtsVolumeChange}
					min={0}
					sliderMax={100}
					inputMax={100}
					adornmentText={"%"}
				/>
			</div>
			{tts_type === TtsType.Piper && (
				<div style={{ display: "flex", placeContent: "center" }}>
					<PiperSettings onChange={onSettingsChange} tts_settings={settings} />
				</div>
			)}
			{tts_type === TtsType.FishAudio && (
				<div style={{ display: "flex", placeContent: "center" }}>
					{fishAudioService?.authorized && (
						<FishAudioSettings
							onChange={onSettingsChange}
							tts_settings={settings}
						/>
					)}
				</div>
			)}
		</>
	);
};
export default TtsSettings;

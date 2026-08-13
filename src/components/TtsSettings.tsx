import { MenuItem, Select, Typography } from "@mui/material";
import { TtsType } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import styles from "./dashboard/components/settings/Settings.module.css";
import InputSlider from "./InputSlider";
import PiperVoices from "./PiperVoices";

const TtsSettings = ({
	tts_type,
	onTtsTypeChange,
	tts_volume,
	onTtsVolumeChange,
	voices,
	onVoicesChange,
}: {
	tts_type: TtsType;
	onTtsTypeChange: (tts_type: TtsType) => void;
	tts_volume: number;
	onTtsVolumeChange: (tts_volume: number) => void;
	voices: Record<string, string>;
	onVoicesChange: (voices: Record<string, string>) => void;
}) => {
	const { t } = useTranslation();

	return (
		<>
			<div className={styles.settings}>
				<div className={styles.label}>
					<Typography>
						{t("settings.tts_type")}{" "}
						<span style={{ fontSize: 12 }}>
							(
							{tts_type !== TtsType.Piper
								? t("tts.quotas").toLowerCase()
								: t("tts.model_ram").toLowerCase()}
							)
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
					<PiperVoices onChange={onVoicesChange} voices={voices} />
				</div>
			)}
		</>
	);
};
export default TtsSettings;

import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
	Button,
	CircularProgress,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { convertFileSrc } from "@tauri-apps/api/core";
import { AlertVariant, type IAlert } from "@widy/sdk";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { FILE_FILTERS } from "../../../../../constants";
import selectAndSaveStaticFile from "../../../../../helpers/selectAndSaveStaticFile";
import type { AppState } from "../../../../../store";
import InputSlider from "../../../../InputSlider";
import styles from "../../settings/Settings.module.css";

const AlertVariantSettings = ({
	value,
	setValue,
}: {
	value: IAlert;
	setValue: (updated: IAlert) => void;
}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const { appDataDir } = useSelector((state: AppState) => state.mainState);
	const audioUrl = convertFileSrc(`${appDataDir}/static/${value?.audio}`);
	const alertAudioRef = useRef(new Audio(audioUrl));
	const { t } = useTranslation();
	const [isVideoSelecting, setIsVideoSelecting] = useState(false);

	useEffect(() => {
		if (alertAudioRef.current && value) {
			alertAudioRef.current.volume = value.audio_volume / 100;
		}
	}, [value]);

	useEffect(() => {
		return () => alertAudioRef.current.pause();
	}, []);

	useEffect(() => {
		alertAudioRef.current.onended = () => setIsPlaying(false);
		alertAudioRef.current.onerror = () => setIsPlaying(false);

		return () => {
			alertAudioRef.current.onended = null;
			alertAudioRef.current.onerror = null;
		};
	}, []);

	return (
		value && (
			<div
				style={{
					display: "grid",
					placeItems: "center",
				}}
			>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("alert.variant")}:</span>
						</div>
						<Select sx={{ width: 150 }} value={value.alert_variant}>
							{Object.values(AlertVariant).map((variant) => (
								<MenuItem
									value={variant}
									key={variant}
									onClick={() => {
										setValue({
											...value,
											alert_variant: variant,
										});
									}}
								>
									{t(`alert_variant.${variant}`)}
								</MenuItem>
							))}
						</Select>
					</div>
					{(value.alert_variant === AlertVariant.Image ||
						value.alert_variant === AlertVariant.ImageAndAudio) && (
						<div className={styles.settings}>
							<div className={styles.label}>
								<span>{t("alert.image")}:</span>
							</div>
							<Button
								onClick={async () => {
									const image = await selectAndSaveStaticFile([
										FILE_FILTERS.image,
									]);
									setValue({
										...value,
										image,
									});
								}}
							>
								{value.image ?? t("select")}
							</Button>
						</div>
					)}
					{(value.alert_variant === AlertVariant.Audio ||
						value.alert_variant === AlertVariant.ImageAndAudio) && (
						<>
							<div className={styles.settings}>
								<div className={styles.label}>
									<span>{t("alert.audio")}:</span>
								</div>
								<Button
									onClick={async () => {
										const audio = await selectAndSaveStaticFile([
											FILE_FILTERS.audio,
										]);
										setValue({
											...value,
											audio,
										});
									}}
								>
									{value.audio ?? t("select")}
								</Button>{" "}
								<Button
									onClick={() => {
										if (value.audio && alertAudioRef.current.paused) {
											alertAudioRef.current.play();
											setIsPlaying(true);
										} else {
											alertAudioRef.current.pause();
											alertAudioRef.current.currentTime = 0;
											setIsPlaying(false);
										}
									}}
								>
									<div
										style={{ display: "flex", placeItems: "center", gap: 3 }}
									>
										{isPlaying ? <StopIcon /> : <VolumeUpIcon />}
										{isPlaying ? t("audio.stop") : t("audio.play")}
									</div>
								</Button>
							</div>
							<div className={styles.settings}>
								<div className={styles.label}>
									<span>{t("alert.audio_volume")}:</span>
								</div>

								<InputSlider
									sliderValue={value.audio_volume}
									inputValue={value.audio_volume}
									onChange={(audio_volume) => {
										setValue({
											...value,
											audio_volume,
										});
									}}
									min={0}
									sliderMax={100}
									inputMax={100}
									adornmentText={"%"}
								/>
							</div>
						</>
					)}
					{value.alert_variant === AlertVariant.Video && (
						<>
							<div className={styles.settings}>
								<div className={styles.label}>
									<span>{t("alert.video")}:</span>
								</div>
								<Button
									disabled={isVideoSelecting}
									onClick={async () => {
										setIsVideoSelecting(true);
										try {
											const video = await selectAndSaveStaticFile([
												FILE_FILTERS.video,
											]);

											setValue({
												...value,
												video,
											});
										} finally {
											setIsVideoSelecting(false);
										}
									}}
								>
									{isVideoSelecting ? (
										<CircularProgress size={25} />
									) : (
										(value.video ?? t("select"))
									)}
								</Button>
							</div>
							<div className={styles.settings}>
								<div className={styles.label}>
									<span>{t("alert.video_volume")}:</span>
								</div>

								<InputSlider
									sliderValue={value.video_volume}
									inputValue={value.video_volume}
									onChange={(video_volume) => {
										setValue({
											...value,
											video_volume,
										});
									}}
									min={0}
									sliderMax={100}
									inputMax={100}
									adornmentText={"%"}
								/>
							</div>
						</>
					)}
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("alert.duration")}:</span>
						</div>
						<NumericFormat
							style={{ width: 100 }}
							inputMode="decimal"
							autoComplete="off"
							allowNegative={false}
							valueIsNumericString
							min={0}
							isAllowed={({ floatValue }) =>
								floatValue === undefined || floatValue <= 60
							}
							customInput={TextField}
							slotProps={{
								input: {
									inputProps: {
										step: 1,
									},
									endAdornment: (
										<InputAdornment position="end">
											{t("settings.sec")}
										</InputAdornment>
									),
								},
							}}
							onChange={(e) => {
								const duration = Number(e.target.value) * 1000;
								setValue({ ...value, duration });
							}}
							value={value.duration / 1000}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("alert.delay")}:</span>
						</div>
						<NumericFormat
							style={{ width: 100 }}
							inputMode="decimal"
							autoComplete="off"
							allowNegative={false}
							valueIsNumericString
							min={0}
							isAllowed={({ floatValue }) =>
								floatValue === undefined || floatValue <= 60
							}
							customInput={TextField}
							slotProps={{
								input: {
									inputProps: {
										step: 1,
									},
									endAdornment: (
										<InputAdornment position="end">
											{t("settings.sec")}
										</InputAdornment>
									),
								},
							}}
							onChange={(e) => {
								const delay = Number(e.target.value) * 1000;
								setValue({ ...value, delay });
							}}
							value={value.delay / 1000}
						/>
					</div>
				</div>
			</div>
		)
	);
};
export default AlertVariantSettings;

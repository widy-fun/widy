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
import { AlertVariant, TtsType } from "@widy/sdk";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../../../../shared/slices/alertsSlice";
import { FILE_FILTERS } from "../../../../../constants";
import selectAndSaveStaticFile from "../../../../../helpers/selectAndSaveStaticFile";
import type { AppState } from "../../../../../store";
import InputSlider from "../../../../InputSlider";
import styles from "../../settings/Settings.module.css";

const AlertVariantSettings = () => {
	const { alert } = useSelector((state: AppState) => state.alertsState);
	const [isPlaying, setIsPlaying] = useState(false);
	const { appDataDir } = useSelector((state: AppState) => state.mainState);
	const audioUrl = convertFileSrc(`${appDataDir}/static/${alert.audio}`);
	const alertAudioRef = useRef(new Audio(audioUrl));
	const { t } = useTranslation();
	const [isVideoSelecting, setIsVideoSelecting] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (alertAudioRef.current && alert) {
			alertAudioRef.current.volume = alert.audio_volume / 100;
		}
	}, [alert]);

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
					<Select sx={{ width: 150 }} value={alert.alert_variant}>
						{Object.values(AlertVariant).map((variant) => (
							<MenuItem
								value={variant}
								key={variant}
								onClick={() => {
									dispatch(
										setAlert({
											...alert,
											alert_variant: variant,
										}),
									);
								}}
							>
								{t(`alert_variant.${variant}`)}
							</MenuItem>
						))}
					</Select>
				</div>
				{(alert.alert_variant === AlertVariant.Image ||
					alert.alert_variant === AlertVariant.ImageAndAudio) && (
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("alert.image")}:</span>
						</div>
						<Button
							onClick={async () => {
								const image = await selectAndSaveStaticFile([
									FILE_FILTERS.image,
								]);
								dispatch(
									setAlert({
										...alert,
										image,
									}),
								);
							}}
						>
							{alert.image ?? t("select")}
						</Button>
					</div>
				)}
				{(alert.alert_variant === AlertVariant.Audio ||
					alert.alert_variant === AlertVariant.ImageAndAudio) && (
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
									dispatch(
										setAlert({
											...alert,
											audio,
										}),
									);
								}}
							>
								{alert.audio ?? t("select")}
							</Button>{" "}
							<Button
								onClick={() => {
									if (alert.audio && alertAudioRef.current.paused) {
										alertAudioRef.current.play();
										setIsPlaying(true);
									} else {
										alertAudioRef.current.pause();
										alertAudioRef.current.currentTime = 0;
										setIsPlaying(false);
									}
								}}
							>
								<div style={{ display: "flex", placeItems: "center", gap: 3 }}>
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
								sliderValue={alert.audio_volume}
								inputValue={alert.audio_volume}
								onChange={(audio_volume) => {
									dispatch(
										setAlert({
											...alert,
											audio_volume,
										}),
									);
								}}
								min={0}
								sliderMax={100}
								inputMax={100}
								adornmentText={"%"}
							/>
						</div>
					</>
				)}
				{alert.alert_variant === AlertVariant.Video && (
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

										dispatch(
											setAlert({
												...alert,
												video,
											}),
										);
									} finally {
										setIsVideoSelecting(false);
									}
								}}
							>
								{isVideoSelecting ? (
									<CircularProgress size={25} />
								) : (
									(alert.video ?? t("select"))
								)}
							</Button>
						</div>
						<div className={styles.settings}>
							<div className={styles.label}>
								<span>{t("alert.video_volume")}:</span>
							</div>

							<InputSlider
								sliderValue={alert.video_volume}
								inputValue={alert.video_volume}
								onChange={(video_volume) => {
									dispatch(
										setAlert({
											...alert,
											video_volume,
										}),
									);
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
						<span>{t("settings.tts_type")}:</span>
					</div>
					<Select sx={{ width: 150 }} value={alert.tts_type}>
						{Object.values(TtsType).map((tts_type) => (
							<MenuItem
								value={tts_type}
								key={tts_type}
								onClick={() => {
									dispatch(
										setAlert({
											...alert,
											tts_type,
										}),
									);
								}}
							>
								{tts_type}
							</MenuItem>
						))}
					</Select>
				</div>
				<div className={styles.settings}>
					<div className={styles.label}>
						<span>{t("sound_volume")}:</span>
					</div>
					<InputSlider
						sliderValue={alert.tts_volume}
						inputValue={alert.tts_volume}
						onChange={(value) => {
							dispatch(
								setAlert({
									...alert,
									tts_volume: value,
								}),
							);
						}}
						min={0}
						sliderMax={100}
						inputMax={100}
						adornmentText={"%"}
					/>
				</div>
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
							dispatch(setAlert({ ...alert, duration }));
						}}
						value={alert.duration / 1000}
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
							dispatch(setAlert({ ...alert, delay }));
						}}
						value={alert.delay / 1000}
					/>
				</div>
			</div>
		</div>
	);
};
export default AlertVariantSettings;

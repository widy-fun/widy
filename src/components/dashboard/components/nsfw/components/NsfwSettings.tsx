import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	type INsfwSettings,
	type SerializedAppError,
} from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import {
	useGetNsfwSettingsQuery,
	useUpdateNsfwSettingsMutation,
} from "../../../../../api/nsfwApi";
import InputSlider from "../../../../InputSlider";
import styles from "../../settings/Settings.module.css";

const NsfwSettings = () => {
	const { t } = useTranslation();
	const [nsfwSettings, setNsfwSettings] = useState<INsfwSettings>();
	const [updateNsfwSettings] = useUpdateNsfwSettingsMutation();
	const dispatch = useDispatch();
	const { data, error } = useGetNsfwSettingsQuery();

	useEffect(() => {
		if (data) {
			setNsfwSettings(data);
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			dispatch(
				showSnackBar({
					message: error.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	}, [error, dispatch]);

	return (
		nsfwSettings && (
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("nsfw.blur_timeout_duration")}:</span>
						</div>
						<NumericFormat
							style={{ width: 100 }}
							inputMode="decimal"
							autoComplete="off"
							allowNegative={false}
							valueIsNumericString
							min={0}
							isAllowed={({ floatValue }) =>
								floatValue === undefined || floatValue <= 3000000000
							}
							customInput={TextField}
							slotProps={{
								input: {
									inputProps: {
										step: 0.1,
									},
									endAdornment: (
										<InputAdornment position="end">
											{t("settings.sec")}
										</InputAdornment>
									),
								},
							}}
							onChange={(e) => {
								const value = Number(e.target.value);
								setNsfwSettings((prev) =>
									prev
										? {
												...prev,
												blur_timeout_duration: value * 1000,
											}
										: prev,
								);
							}}
							value={nsfwSettings.blur_timeout_duration / 1000}
						/>
					</div>
					<div style={{ textAlign: "center" }}>
						<Typography
							sx={(theme) => ({
								fontSize: 20,
								color: theme.palette.primary.main,
							})}
						>
							{t("nsfw.confidence_threshold")}
						</Typography>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("nsfw.anus")}:</span>
						</div>
						<InputSlider
							sliderValue={nsfwSettings.labels_confidence.anus}
							inputValue={nsfwSettings.labels_confidence.anus}
							onChange={(value) => {
								setNsfwSettings((prev) =>
									prev
										? {
												...prev,
												labels_confidence: {
													...prev.labels_confidence,
													anus: value,
												},
											}
										: prev,
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
							<span>{t("nsfw.make_love")}:</span>
						</div>
						<InputSlider
							sliderValue={nsfwSettings.labels_confidence.make_love}
							inputValue={nsfwSettings.labels_confidence.make_love}
							onChange={(value) => {
								setNsfwSettings((prev) =>
									prev
										? {
												...prev,
												labels_confidence: {
													...prev.labels_confidence,
													make_love: value,
												},
											}
										: prev,
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
							<span>{t("nsfw.nipple")}:</span>
						</div>
						<InputSlider
							sliderValue={nsfwSettings.labels_confidence.nipple}
							inputValue={nsfwSettings.labels_confidence.nipple}
							onChange={(value) => {
								setNsfwSettings((prev) =>
									prev
										? {
												...prev,
												labels_confidence: {
													...prev.labels_confidence,
													nipple: value,
												},
											}
										: prev,
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
							<span>{t("nsfw.penis")}:</span>
						</div>
						<InputSlider
							sliderValue={nsfwSettings.labels_confidence.penis}
							inputValue={nsfwSettings.labels_confidence.penis}
							onChange={(value) => {
								setNsfwSettings((prev) =>
									prev
										? {
												...prev,
												labels_confidence: {
													...prev.labels_confidence,
													penis: value,
												},
											}
										: prev,
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
							<span>{t("nsfw.vagina")}:</span>
						</div>
						<InputSlider
							sliderValue={nsfwSettings.labels_confidence.vagina}
							inputValue={nsfwSettings.labels_confidence.vagina}
							onChange={(value) => {
								setNsfwSettings((prev) =>
									prev
										? {
												...prev,
												labels_confidence: {
													...prev.labels_confidence,
													vagina: value,
												},
											}
										: prev,
								);
							}}
							min={0}
							sliderMax={100}
							inputMax={100}
							adornmentText={"%"}
						/>
					</div>

					<div style={{ display: "flex", placeContent: "center" }}>
						<Button
							variant="contained"
							onClick={async () => {
								try {
									await updateNsfwSettings({ nsfwSettings }).unwrap();
									dispatch(
										showSnackBar({
											message: t("success"),
											alertSeverity: AlertSeverity.success,
										}),
									);
								} catch (error) {
									const err = error as SerializedAppError;
									dispatch(
										showSnackBar({
											message: err.message as string,
											alertSeverity: AlertSeverity.error,
										}),
									);
								}
							}}
						>
							{t("save")}
						</Button>
					</div>
				</div>
			</div>
		)
	);
};
export default NsfwSettings;

import { Button, TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	AssistantServiceStatus,
	type IAssistantSettings,
	type ISerializedAppError,
} from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import {
	useGetAssistantSettingsQuery,
	useGetAssistantStatusQuery,
	useUpdateAssistantSettingsMutation,
} from "../../../../../api/assistantApi";
import styles from "../../settings/Settings.module.css";

const Settings = () => {
	const { t } = useTranslation();

	const [updateAssistantSettings] = useUpdateAssistantSettingsMutation();
	const { data: assistant } = useGetAssistantStatusQuery(undefined, {
		pollingInterval: 1000,
	});
	const dispatch = useDispatch();
	const [assistantSettings, setAssistantSettings] =
		useState<IAssistantSettings>();
	const { data: settings } = useGetAssistantSettingsQuery();

	useEffect(() => {
		if (settings) {
			setAssistantSettings(settings);
		}
	}, [settings]);

	const isStopped = assistant?.status === AssistantServiceStatus.Stopped;

	return (
		assistantSettings && (
			<div style={{ display: "grid", placeItems: "center", gap: 20 }}>
				<div className={styles.settings}>
					<div className={styles.label}>
						<span>{t("assistant.wake_threshold")}:</span>
					</div>
					<NumericFormat
						disabled={!isStopped}
						style={{ width: 150 }}
						inputMode="decimal"
						autoComplete="off"
						allowNegative={false}
						valueIsNumericString
						decimalScale={2}
						customInput={TextField}
						isAllowed={(values) => {
							const { floatValue } = values;
							return (
								floatValue === undefined || (floatValue >= 0 && floatValue <= 1)
							);
						}}
						onValueChange={(values) => {
							const { floatValue } = values;
							setAssistantSettings((prev) =>
								prev
									? {
											...prev,
											wake_threshold: floatValue ?? 0,
										}
									: prev,
							);
						}}
						value={assistantSettings.wake_threshold}
					/>
				</div>
				<div className={styles.settings}>
					<div className={styles.label}>
						<span>{t("assistant.vad_threshold")}:</span>
					</div>
					<NumericFormat
						disabled={!isStopped}
						style={{ width: 150 }}
						inputMode="decimal"
						autoComplete="off"
						allowNegative={false}
						valueIsNumericString
						decimalScale={2}
						customInput={TextField}
						isAllowed={(values) => {
							const { floatValue } = values;
							return (
								floatValue === undefined || (floatValue >= 0 && floatValue <= 1)
							);
						}}
						onValueChange={(values) => {
							const { floatValue } = values;
							setAssistantSettings((prev) =>
								prev
									? {
											...prev,
											vad_threshold: floatValue ?? 0,
										}
									: prev,
							);
						}}
						value={assistantSettings.vad_threshold}
					/>
				</div>
				<div className={styles.settings}>
					<div className={styles.label}>
						<span>{t("assistant.max_tokens")}:</span>
					</div>
					<NumericFormat
						disabled={!isStopped}
						style={{ width: 150 }}
						inputMode="decimal"
						autoComplete="off"
						allowNegative={false}
						valueIsNumericString
						decimalScale={0}
						customInput={TextField}
						onChange={(e) => {
							const value = Number(e.target.value);
							setAssistantSettings((prev) =>
								prev
									? {
											...prev,
											max_tokens: value,
										}
									: prev,
							);
						}}
						value={assistantSettings.max_tokens}
					/>
				</div>
				<div className={styles.settings}>
					<div className={styles.label}>
						<span>{t("assistant.silence_hangover_frames")}:</span>
					</div>
					<NumericFormat
						disabled={!isStopped}
						style={{ width: 150 }}
						inputMode="decimal"
						autoComplete="off"
						allowNegative={false}
						valueIsNumericString
						decimalScale={0}
						customInput={TextField}
						onChange={(e) => {
							const value = Number(e.target.value);
							setAssistantSettings((prev) =>
								prev
									? {
											...prev,
											silence_hangover_frames: value,
										}
									: prev,
							);
						}}
						value={assistantSettings.silence_hangover_frames}
					/>
				</div>
				<div style={{ display: "flex", placeContent: "center" }}>
					<Button
						variant="contained"
						disabled={!isStopped}
						onClick={async () => {
							try {
								if (isStopped) {
									await updateAssistantSettings({
										assistantSettings,
									}).unwrap();
									dispatch(
										showSnackBar({
											message: t("success"),
											alertSeverity: AlertSeverity.success,
										}),
									);
								}
							} catch (error) {
								const err = error as ISerializedAppError;
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
		)
	);
};
export default Settings;

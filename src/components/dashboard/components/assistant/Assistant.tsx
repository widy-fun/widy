import { Button, MenuItem, Select } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	AssistantProvider,
	AssistantServiceStatus,
	type IAssistantSettings,
	type ISerializedAppError,
} from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
	useGetAssistantProviderModelsQuery,
	useGetAssistantSettingsQuery,
	useGetAssistantStatusQuery,
	useGetInputDevicesQuery,
	useStartAssistantMutation,
	useStopAssistantMutation,
} from "../../../../api/assistantApi";
import styles from "../settings/Settings.module.css";

const Assistant = () => {
	const { t } = useTranslation();
	const { data: devices } = useGetInputDevicesQuery(undefined, {
		pollingInterval: 1000,
	});
	const [startAssistant] = useStartAssistantMutation();
	const [stopAssistant] = useStopAssistantMutation();
	const { data: assistant } = useGetAssistantStatusQuery(undefined, {
		pollingInterval: 1000,
	});
	const dispatch = useDispatch();
	const [assistantSettings, setAssistantSettings] =
		useState<IAssistantSettings>();
	const { data: settings } = useGetAssistantSettingsQuery();
	const { data: models } = useGetAssistantProviderModelsQuery({
		provider: assistantSettings?.provider ?? AssistantProvider.Gemini,
	});

	useEffect(() => {
		if (settings && devices) {
			setAssistantSettings({
				...settings,
				device_id:
					devices.find((d) => d.id === settings.device_id)?.id ??
					devices.find((d) => d.default)?.id ??
					"0",
			});
		}
	}, [settings, devices]);

	return (
		devices &&
		assistantSettings && (
			<>
				<h1>{t("assistant.title")}</h1>
				<div style={{ display: "grid", placeItems: "center", gap: 20 }}>
					<div className={styles.settingsContainer}>
						<div className={styles.settings}>
							<div className={styles.label}>
								<span>{t("assistant.input_device")}:</span>
							</div>
							<Select
								sx={{ width: 150 }}
								value={
									devices.find((d) => d.id === assistantSettings.device_id)
										?.name ?? devices.find((d) => d.default)?.name
								}
							>
								{devices.map((device) => (
									<MenuItem
										value={device.name}
										key={device.id}
										onClick={() => {
											setAssistantSettings((prev) =>
												prev
													? {
															...prev,
															device_id: device.id,
														}
													: prev,
											);
										}}
									>
										{device.name}
									</MenuItem>
								))}
							</Select>
						</div>
					</div>

					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("assistant.provider")}:</span>
						</div>
						<Select sx={{ width: 150 }} value={assistantSettings.provider}>
							{Object.values(AssistantProvider).map((provider) => (
								<MenuItem
									value={provider}
									key={provider}
									onClick={() => {
										setAssistantSettings((prev) =>
											prev
												? {
														...prev,
														provider,
													}
												: prev,
										);
									}}
								>
									{provider}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("assistant.model")}:</span>
						</div>
						<Select sx={{ width: 150 }} value={assistantSettings.model}>
							{models?.map((model) => (
								<MenuItem
									value={model}
									key={model}
									onClick={() => {
										setAssistantSettings((prev) =>
											prev
												? {
														...prev,
														model,
													}
												: prev,
										);
									}}
								>
									{model}
								</MenuItem>
							))}
						</Select>
					</div>
					<div style={{ display: "flex", placeContent: "center" }}>
						<Button
							variant="contained"
							disabled={
								assistant?.status === AssistantServiceStatus.Starting ||
								assistant?.status === AssistantServiceStatus.Stopping
							}
							onClick={async () => {
								try {
									if (assistant?.status === AssistantServiceStatus.Stopped) {
										await startAssistant({
											assistantSettings,
										}).unwrap();
									} else if (
										assistant?.status === AssistantServiceStatus.Started
									) {
										await stopAssistant().unwrap();
									}

									dispatch(
										showSnackBar({
											message: t("success"),
											alertSeverity: AlertSeverity.success,
										}),
									);
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
							{assistant?.status === AssistantServiceStatus.Stopped &&
								t("start")}
							{assistant?.status === AssistantServiceStatus.Started &&
								t("stop")}
							{assistant?.status === AssistantServiceStatus.Stopping &&
								t("stopping")}
							{assistant?.status === AssistantServiceStatus.Starting &&
								t("starting")}
						</Button>
					</div>
				</div>
			</>
		)
	);
};
export default Assistant;

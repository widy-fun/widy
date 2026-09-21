import {
	Button,
	Checkbox,
	ListItemText,
	MenuItem,
	Select,
} from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	AssistantServiceStatus,
	type IAssistantSettings,
	type ISerializedAppError,
	ServiceType,
	ToolCallingProvider,
} from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
	useGetAssistantProviderModelsQuery,
	useGetAssistantSettingsQuery,
	useGetAssistantStatusQuery,
	useGetInputDevicesQuery,
	useGetToolsQuery,
	useStartAssistantMutation,
	useStopAssistantMutation,
	useUpdateAssistantSettingsMutation,
} from "../../../../../api/assistantApi";
import { useGetServiceByIdQuery } from "../../../../../api/servicesApi";
import {
	NEMOTRON_3_5_ASR_LANGUAGES,
	STT_MODELS,
} from "../../../../../constants";
import styles from "../../settings/Settings.module.css";

const Device = () => {
	const { t } = useTranslation();
	const { data: devices } = useGetInputDevicesQuery(undefined, {
		pollingInterval: 1000,
	});
	const [startAssistant] = useStartAssistantMutation();
	const [stopAssistant] = useStopAssistantMutation();
	const [updateAssistantSettings] = useUpdateAssistantSettingsMutation();
	const { data: assistant } = useGetAssistantStatusQuery(undefined, {
		pollingInterval: 1000,
	});
	const dispatch = useDispatch();
	const [assistantSettings, setAssistantSettings] =
		useState<IAssistantSettings>();
	const { data: tools } = useGetToolsQuery();
	const { data: settings } = useGetAssistantSettingsQuery();
	const { data: tool_calling_models } = useGetAssistantProviderModelsQuery({
		provider:
			assistantSettings?.tool_calling_provider ?? ToolCallingProvider.Gemini,
	});
	const { data: gemini } = useGetServiceByIdQuery({ id: ServiceType.Gemini });
	const { data: openai } = useGetServiceByIdQuery({ id: ServiceType.OpenAI });
	const { data: claude } = useGetServiceByIdQuery({ id: ServiceType.Claude });

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

	useEffect(() => {
		if (
			assistantSettings &&
			tool_calling_models &&
			!tool_calling_models.some(
				(m) => m.id === assistantSettings.tool_calling_model.id,
			)
		) {
			setAssistantSettings((prev) =>
				prev
					? {
							...prev,
							tool_calling_model: tool_calling_models[0],
						}
					: prev,
			);
		}
	}, [tool_calling_models, assistantSettings]);

	const isStopped = assistant?.status === AssistantServiceStatus.Stopped;

	return (
		devices &&
		assistantSettings && (
			<div style={{ display: "grid", placeItems: "center", gap: 20 }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("assistant.input_device")}:</span>
						</div>
						<Select
							disabled={!isStopped}
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
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("assistant.stt_model")}:</span>
						</div>
						<Select
							disabled={!isStopped}
							sx={{ width: 150 }}
							value={assistantSettings.stt_model}
						>
							{Object.keys(STT_MODELS).map((model) => (
								<MenuItem
									value={model}
									key={model}
									onClick={() => {
										setAssistantSettings((prev) =>
											prev
												? {
														...prev,
														stt_model: model,
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
				</div>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("assistant.stt_language")}:</span>
						</div>
						<Select
							disabled={!isStopped}
							sx={{ width: 150 }}
							value={assistantSettings.stt_language}
						>
							{Object.keys(NEMOTRON_3_5_ASR_LANGUAGES).map((stt_language) => (
								<MenuItem
									value={stt_language}
									key={stt_language}
									onClick={() => {
										setAssistantSettings((prev) =>
											prev
												? {
														...prev,
														stt_language,
													}
												: prev,
										);
									}}
								>
									{NEMOTRON_3_5_ASR_LANGUAGES[stt_language]}
								</MenuItem>
							))}
						</Select>
					</div>
				</div>

				<div className={styles.settings}>
					<div className={styles.label}>
						<span>{t("assistant.provider")}:</span>
					</div>
					<Select
						disabled={!isStopped}
						sx={{ width: 150 }}
						value={assistantSettings.tool_calling_provider}
					>
						{Object.values(ToolCallingProvider).map((tool_calling_provider) => (
							<MenuItem
								value={tool_calling_provider}
								key={tool_calling_provider}
								onClick={async () => {
									setAssistantSettings((prev) =>
										prev
											? {
													...prev,
													tool_calling_provider,
												}
											: prev,
									);
								}}
							>
								{tool_calling_provider}
							</MenuItem>
						))}
					</Select>
				</div>
				<div className={styles.settings}>
					<div className={styles.label}>
						<span>{t("assistant.model")}:</span>
					</div>
					<Select
						disabled={!isStopped}
						sx={{ width: 150 }}
						value={assistantSettings.tool_calling_model.display_name}
					>
						{tool_calling_models?.map((tool_calling_model) => (
							<MenuItem
								value={tool_calling_model.display_name}
								key={tool_calling_model.id}
								onClick={() => {
									setAssistantSettings((prev) =>
										prev
											? {
													...prev,
													tool_calling_model,
												}
											: prev,
									);
								}}
							>
								{tool_calling_model.display_name}
							</MenuItem>
						))}
					</Select>
				</div>
				<div className={styles.settings}>
					<div className={styles.label}>
						<span>{t("assistant.tools")}:</span>
					</div>
					<Select
						disabled={!isStopped}
						sx={{ width: 150 }}
						multiple
						value={assistantSettings.tools.map((tool) => tool.function.name)}
						onChange={(e) => {
							const selectedNames = e.target.value as unknown as string[];
							const selectedTools = (tools ?? []).filter((tool) =>
								selectedNames.includes(tool.function.name),
							);
							setAssistantSettings((prev) =>
								prev
									? {
											...prev,
											tools: selectedTools,
										}
									: prev,
							);
						}}
						renderValue={(selected) => (selected as string[]).join(", ")}
					>
						{(tools ?? []).map((tool) => (
							<MenuItem key={tool.function.name} value={tool.function.name}>
								<Checkbox
									checked={assistantSettings.tools.some(
										(t) => t.function.name === tool.function.name,
									)}
								/>
								<ListItemText primary={t(`tools.${tool.function.name}`)} />
							</MenuItem>
						))}
					</Select>
				</div>
				<div style={{ display: "flex", placeContent: "center" }}>
					<Button
						variant="contained"
						disabled={
							assistant?.status === AssistantServiceStatus.Starting ||
							assistant?.status === AssistantServiceStatus.Stopping ||
							assistant?.status === AssistantServiceStatus.DownloadingModel
						}
						onClick={async () => {
							const providersAuthMap = {
								[ToolCallingProvider.Gemini]: gemini?.authorized,
								[ToolCallingProvider.OpenAI]: openai?.authorized,
								[ToolCallingProvider.Claude]: claude?.authorized,
								[ToolCallingProvider.Local]: true,
							};

							if (!providersAuthMap[assistantSettings.tool_calling_provider]) {
								dispatch(
									showSnackBar({
										message: t("error.not_connected"),
										alertSeverity: AlertSeverity.warning,
									}),
								);
								return;
							}
							try {
								if (isStopped) {
									await updateAssistantSettings({
										assistantSettings,
									}).unwrap();
									await startAssistant({
										assistantSettings,
									}).unwrap();
								} else if (
									assistant?.status === AssistantServiceStatus.Started
								) {
									await stopAssistant().unwrap();
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
						{isStopped && t("start")}
						{assistant?.status === AssistantServiceStatus.Started && t("stop")}
						{assistant?.status === AssistantServiceStatus.Stopping &&
							t("stopping")}
						{assistant?.status === AssistantServiceStatus.Starting &&
							t("starting")}
						{assistant?.status === AssistantServiceStatus.DownloadingModel &&
							t("downloading")}
					</Button>
				</div>
			</div>
		)
	);
};
export default Device;

import { Button, MenuItem, Select } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	type IInputDeviceInfo,
	type ISerializedAppError,
} from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
	useGetInputDevicesQuery,
	useStartAssistantMutation,
	useStopAssistantMutation,
} from "../../../../../api/assistantApi";
import styles from "../../settings/Settings.module.css";

const AssistantDevice = () => {
	const { t } = useTranslation();
	const { data } = useGetInputDevicesQuery(undefined, {
		pollingInterval: 1000,
	});
	const [inputDeviceInfo, setInputDeviceInfo] = useState<IInputDeviceInfo>({
		name: t("none"),
		id: "-1",
		selected: false,
	});
	const [startAssistant, { isLoading }] = useStartAssistantMutation();
	const [stopAssistant] = useStopAssistantMutation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (data) {
			const selectedInputDeviceInfo = data.find((w) => w.selected);
			if (selectedInputDeviceInfo) {
				setInputDeviceInfo(selectedInputDeviceInfo);
			}
		}
	}, [data]);

	return (
		data && (
			<div style={{ display: "grid", placeItems: "center", gap: 20 }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("assistant.input_device")}:</span>
						</div>
						<Select
							sx={{ width: 150 }}
							value={inputDeviceInfo.name}
							displayEmpty
						>
							<MenuItem value={t("none")} disabled>
								<em>{t("none")}</em>
							</MenuItem>
							{data.map((d) => (
								<MenuItem
									value={d.name}
									key={d.id}
									onClick={() => setInputDeviceInfo(d)}
								>
									{d.name}
								</MenuItem>
							))}
						</Select>
					</div>
				</div>
				<div style={{ display: "flex", placeContent: "center" }}>
					<Button
						variant="contained"
						disabled={isLoading}
						onClick={async () => {
							if (!inputDeviceInfo) return;
							try {
								await startAssistant({ deviceInfo: inputDeviceInfo }).unwrap();
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
						{t("start")}
					</Button>
					<Button
						variant="contained"
						disabled={isLoading}
						onClick={async () => {
							try {
								await stopAssistant().unwrap();
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
						{t("stop")}
					</Button>
				</div>
			</div>
		)
	);
};
export default AssistantDevice;

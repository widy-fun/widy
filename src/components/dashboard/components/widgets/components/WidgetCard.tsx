import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, Card } from "@mui/material";
import type { SerializedError } from "@reduxjs/toolkit";
import { AlertSeverity, type IManifest, type IWidget } from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../../../../../../shared/slices/snackBarSlice";
import {
	useInstallWidgetMutation,
	useUpdateWidgetMutation,
} from "../../../../../api/widgetsApi";
import WarningDialog from "../../../../WarningDialog";
import WidgetDescription from "./WidgetDescription";
import WidgetWarning from "./WidgetWarning";

const WidgetCard = ({
	manifest,
	installedWidgets,
}: {
	manifest: IManifest;
	installedWidgets: IWidget[];
}) => {
	const installed = !!installedWidgets.find(
		(widget) => widget.manifest.id === manifest.id && !widget.dev_path,
	);
	const update = installedWidgets.find(
		(widget) =>
			widget.manifest.id === manifest.id &&
			widget.manifest.version !== manifest.version &&
			!widget.dev_path,
	);
	const { t } = useTranslation();
	const [installWidget, { isLoading: isLoadingInstallWidget }] =
		useInstallWidgetMutation();
	const [updateWidget, { isLoading: isLoadingUpdateWidget }] =
		useUpdateWidgetMutation();
	const dispatch = useDispatch();
	const [warningOpen, setWarningOpen] = useState(false);

	const handleInstall = async () => {
		setWarningOpen(false);
		try {
			await installWidget({ manifest }).unwrap();
			dispatch(
				showSnackBar({
					message: t("success"),
					alertSeverity: AlertSeverity.success,
				}),
			);
		} catch (error) {
			const err = error as SerializedError;
			dispatch(
				showSnackBar({
					message: err.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	};

	const handleUpdate = async () => {
		if (!update) return;
		setWarningOpen(false);
		try {
			await updateWidget({ manifest, id: update.id }).unwrap();
			dispatch(
				showSnackBar({
					message: t("success"),
					alertSeverity: AlertSeverity.success,
				}),
			);
		} catch (error) {
			const err = error as SerializedError;
			dispatch(
				showSnackBar({
					message: err.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	};

	return (
		<>
			<WarningDialog
				open={warningOpen}
				setOpen={setWarningOpen}
				title={t("widgets.install")}
				warning={<WidgetWarning manifest={manifest} />}
				onClick={() => {
					if (update) {
						handleUpdate();
					} else {
						handleInstall();
					}
				}}
			/>
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					marginBottom: "16px",
					padding: "16px",
					boxSizing: "border-box",
					minHeight: 150,
				}}
			>
				<WidgetDescription manifest={manifest} />

				<Box sx={{ display: "flex", gap: "8px", marginTop: "12px" }}>
					{update ? (
						<Button
							disabled={isLoadingUpdateWidget}
							variant="contained"
							size="small"
							startIcon={<DownloadIcon />}
							onClick={() => {
								setWarningOpen(true);
							}}
						>
							{isLoadingUpdateWidget
								? t("widgets.updating")
								: t("widgets.update")}
						</Button>
					) : (
						<Button
							disabled={installed || isLoadingInstallWidget}
							variant="contained"
							size="small"
							startIcon={<DownloadIcon />}
							onClick={() => {
								setWarningOpen(true);
							}}
						>
							{isLoadingInstallWidget
								? t("widgets.installing")
								: t("widgets.install")}
						</Button>
					)}
				</Box>
			</Card>
		</>
	);
};
export default WidgetCard;

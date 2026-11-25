import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	useGetSettingsQuery,
	useUpdateSettingsMutation,
} from "../api/settingsApi";
import useUpdater from "../hooks/useUpdater";

const formatBytes = (bytes: number) => {
	if (bytes <= 0) {
		return "0 MB";
	}

	const megabytes = bytes / 1024 / 1024;
	return `${megabytes >= 10 ? megabytes.toFixed(1) : megabytes.toFixed(2)} MB`;
};

const UpdaterDialog = () => {
	const [updateSettings] = useUpdateSettingsMutation();
	const { data: settings } = useGetSettingsQuery();
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();
	const { updateApp, update, isUpdating, downloadProgress } = useUpdater();
	const handleClose = () => {
		if (isUpdating) {
			return;
		}

		setOpen(false);
	};
	const { downloadedBytes, totalBytes } = downloadProgress;
	const percent =
		totalBytes && totalBytes > 0
			? Math.min(100, Math.round((downloadedBytes / totalBytes) * 100))
			: 0;
	const hasKnownSize = totalBytes !== null && totalBytes > 0;

	useEffect(() => {
		if (update) {
			setOpen(true);
		}
	}, [update]);

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle sx={{ pb: 1, fontWeight: 700, textAlign: "center" }}>
				{t("updater.title")}
			</DialogTitle>
			{isUpdating ? (
				<DialogContent sx={{ px: 4, pb: 4, pt: 2 }}>
					<Stack sx={{ alignItems: "center", width: 150 }}>
						<Box sx={{ position: "relative", display: "inline-flex" }}>
							<CircularProgress
								variant={hasKnownSize ? "determinate" : "indeterminate"}
								value={percent}
								size={112}
								thickness={3}
								sx={{
									color: "primary.main",
									"& .MuiCircularProgress-circle": {
										strokeLinecap: "round",
									},
								}}
							/>
							<Box
								sx={{
									position: "absolute",
									inset: 0,
									display: "grid",
									placeItems: "center",
								}}
							>
								<Typography variant="h5" sx={{ fontWeight: 800 }}>
									{hasKnownSize ? `${percent}%` : formatBytes(downloadedBytes)}
								</Typography>
							</Box>
						</Box>
						<Box sx={{ width: "100%", textAlign: "center" }}>
							<Typography variant="body2" sx={{ mb: 0.5, fontWeight: 700 }}>
								{t("updater.downloading")}
							</Typography>
							<Typography variant="caption" color="text.secondary">
								{totalBytes !== null && totalBytes > 0
									? `${formatBytes(downloadedBytes)} / ${formatBytes(totalBytes)}`
									: formatBytes(downloadedBytes)}
							</Typography>
						</Box>
					</Stack>
				</DialogContent>
			) : (
				<>
					<DialogContent sx={{ px: 4, pb: 2 }}>
						<DialogContentText sx={{ textAlign: "center", mb: 1 }}>
							{t("updater.description")}
						</DialogContentText>
						{update?.version && (
							<Typography
								variant="caption"
								sx={{
									display: "block",
									width: "fit-content",
									mx: "auto",
									mt: 1.5,
									px: 1.25,
									py: 0.5,
									borderRadius: 99,
									backgroundColor: "action.hover",
									color: "text.secondary",
									fontWeight: 700,
								}}
							>
								v{update.version}
							</Typography>
						)}
					</DialogContent>
					<DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
						<Button
							onClick={() => {
								handleClose();
								if (settings) {
									updateSettings({
										settings: { ...settings, check_update: false },
									});
								}
							}}
							sx={{ flex: 1 }}
						>
							{t("updater.later")}
						</Button>
						<Button
							onClick={() => updateApp()}
							variant="contained"
							sx={{ flex: 1.35, borderRadius: 2 }}
						>
							{t("updater.update")}
						</Button>
					</DialogActions>
				</>
			)}
		</Dialog>
	);
};
export default UpdaterDialog;

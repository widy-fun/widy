import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, Card, IconButton } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	type IManifest,
	type ISerializedAppError,
	type IWidget,
} from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
	useDeleteWidgetMutation,
	useUpdateWidgetMutation,
} from "../../../../../api/widgetsApi";
import WarningDialog from "../../../../WarningDialog";
import WidgetUrl from "../../alerts/components/WidgetUrl";
import WidgetDescription from "./WidgetDescription";
import WidgetWarning from "./WidgetWarning";

const InstalledWidgetCard = ({
	widget,
	availableManifest,
}: {
	widget: IWidget;
	availableManifest?: IManifest;
}) => {
	const { t } = useTranslation();
	const [deleteWidget] = useDeleteWidgetMutation();
	const [updateWidget, { isLoading: isLoadingUpdateWidget }] =
		useUpdateWidgetMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [warningOpen, setWarningOpen] = useState(false);
	const [updateWarningOpen, setUpdateWarningOpen] = useState(false);
	const widgetUrl = `http://localhost:12553/widget/${widget.id}`;
	const updateAvailable =
		availableManifest && availableManifest.version !== widget.manifest.version;

	const handleDelete = () => {
		deleteWidget({ widget }).unwrap();
		setWarningOpen(false);
	};

	const handleUpdate = async () => {
		if (!availableManifest) return;
		setUpdateWarningOpen(false);
		try {
			await updateWidget({
				manifest: availableManifest,
				id: widget.id,
			}).unwrap();
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
	};

	return (
		<>
			<WarningDialog
				open={warningOpen}
				setOpen={setWarningOpen}
				title={t("widgets.delete")}
				warning={t("widgets.delete_confirm")}
				onClick={handleDelete}
			/>
			{availableManifest && (
				<WarningDialog
					open={updateWarningOpen}
					setOpen={setUpdateWarningOpen}
					title={t("widgets.update")}
					warning={<WidgetWarning manifest={availableManifest} />}
					onClick={handleUpdate}
				/>
			)}
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					padding: "16px",
					boxSizing: "border-box",
					minHeight: 150,
				}}
			>
				<WidgetDescription
					manifest={widget.manifest}
					isDev={!!widget.dev_path}
				/>
				{!widget.manifest.embedded && (
					<WidgetUrl widgetUrl={widgetUrl} text={t("widgets.view_url")} />
				)}
				<Box
					sx={{
						display: "flex",
						marginTop: "12px",
						justifyContent: "space-between",
					}}
				>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Button
							variant="contained"
							size="small"
							onClick={() => {
								navigate(`/widget/${widget.id}`);
							}}
						>
							{t("widgets.control")}
						</Button>
						{updateAvailable && (
							<Button
								disabled={isLoadingUpdateWidget}
								variant="outlined"
								size="small"
								startIcon={<DownloadIcon />}
								onClick={() => setUpdateWarningOpen(true)}
							>
								{isLoadingUpdateWidget
									? t("widgets.updating")
									: t("widgets.update")}
							</Button>
						)}
					</Box>
					<Box>
						<IconButton
							size="small"
							onClick={() => {
								setWarningOpen(true);
							}}
							color="error"
						>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Box>
				</Box>
			</Card>
		</>
	);
};
export default InstalledWidgetCard;

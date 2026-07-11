import SettingsIcon from "@mui/icons-material/Settings";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import type { SerializedError } from "@reduxjs/toolkit";
import { showSnackBar } from "@widy/react";
import { AlertSeverity } from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import WarningDialog from "./WarningDialog";

const ConfigurationMenu = ({
	onConfirm,
	warning,
	configurePath,
	onTest,
	isShowDelete = true,
}: {
	onConfirm: () => Promise<void>;
	warning: string;
	configurePath: string;
	onTest: () => void;
	isShowDelete?: boolean;
}) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const navigate = useNavigate();

	return (
		<>
			<WarningDialog
				open={dialogOpen}
				setOpen={setDialogOpen}
				title={t("delete")}
				warning={warning}
				onClick={async () => {
					try {
						await onConfirm();
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
					setDialogOpen(true);
				}}
			/>

			<Box>
				<IconButton onClick={handleClick}>
					<SettingsIcon />
				</IconButton>
				<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
					<MenuItem
						onClick={() => {
							navigate(configurePath);
						}}
					>
						{t("configure")}
					</MenuItem>
					<MenuItem onClick={onTest}>{t("test")}</MenuItem>
					{isShowDelete && (
						<MenuItem
							onClick={() => {
								setDialogOpen(true);
							}}
						>
							{t("delete")}
						</MenuItem>
					)}
				</Menu>
			</Box>
		</>
	);
};
export default ConfigurationMenu;

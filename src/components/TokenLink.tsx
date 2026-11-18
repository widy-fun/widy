import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, IconButton, TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	type ISerializedAppError,
	type IToken,
} from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRotateTokenMutation } from "../api/tokensApi";
import WarningDialog from "./WarningDialog";

const TokenLink = ({ url, token }: { url: string; token: IToken }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [isUrlVisible, setIsUrlVisible] = useState(false);
	const [rotateDialogOpen, setRotateDialogOpen] = useState(false);

	const [rotateToken, { isLoading: isRotatingToken }] =
		useRotateTokenMutation();
	const maskedUrl = "••••••••••••••••••••••••••••••";
	const toggleLabel = isUrlVisible ? t("hide_link") : t("show_link");

	const handleRotateToken = async () => {
		if (!token) {
			setRotateDialogOpen(false);
			return;
		}
		try {
			await rotateToken({ token }).unwrap();
			setIsUrlVisible(false);
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
		} finally {
			setRotateDialogOpen(false);
		}
	};

	return (
		<>
			<WarningDialog
				open={rotateDialogOpen}
				setOpen={setRotateDialogOpen}
				title={t("rotate_token")}
				warning={t("sure_rotate_token")}
				onClick={handleRotateToken}
			/>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1.5,
					width: "100%",
				}}
			>
				<TextField
					size="small"
					variant="outlined"
					value={isUrlVisible ? url : maskedUrl}
					slotProps={{
						htmlInput: {
							readOnly: true,
						},
					}}
					sx={(theme) => ({
						width: 400,
						"& .MuiInputBase-root": {
							minHeight: "42px",
							overflow: "hidden",
							borderRadius: 2,
							backgroundColor: "rgba(0, 0, 0, 0.02)",
						},
						"& .MuiOutlinedInput-input": {
							paddingRight: 0,
							fontSize: "0.875rem",
							color: isUrlVisible ? "inherit" : theme.palette.primary.main,
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						},
					})}
				/>
				<IconButton
					size="small"
					aria-label={toggleLabel}
					onClick={() => setIsUrlVisible((value) => !value)}
					sx={{
						border: "1px solid",
						borderColor: "divider",
						borderRadius: 1,
					}}
				>
					{isUrlVisible ? (
						<VisibilityOffIcon fontSize="small" />
					) : (
						<VisibilityIcon fontSize="small" />
					)}
				</IconButton>
				<IconButton
					size="small"
					aria-label={t("copy")}
					onClick={() => {
						void navigator.clipboard.writeText(url);
					}}
					sx={{
						border: "1px solid",
						borderColor: "divider",
						borderRadius: 1,
					}}
				>
					<ContentCopyIcon fontSize="small" />
				</IconButton>
				<IconButton
					size="small"
					aria-label={t("rotate_token")}
					disabled={!token || isRotatingToken}
					onClick={() => setRotateDialogOpen(true)}
					sx={{
						border: "1px solid",
						borderColor: "divider",
						borderRadius: 1,
					}}
				>
					<RefreshIcon fontSize="small" />
				</IconButton>
			</Box>
		</>
	);
};
export default TokenLink;

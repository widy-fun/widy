import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
	Box,
	Card,
	CardContent,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import { type IModerator, TokenType } from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteModeratorByIdMutation } from "../../../../../api/moderatorsApi";
import { useGetTokenByTypeQuery } from "../../../../../api/tokensApi";
import ConfigurationMenu from "../../../../ConfigurationMenu";

const ModeratorCard = ({ moderator }: { moderator: IModerator }) => {
	const { t } = useTranslation();
	const [deleteModeratorById] = useDeleteModeratorByIdMutation();
	const [isUrlVisible, setIsUrlVisible] = useState(false);
	const protocol = import.meta.env.DEV ? "http" : "https";
	const { data: moderatorToken } = useGetTokenByTypeQuery({
		type: TokenType.Moderation,
	});
	const url = `${protocol}://${import.meta.env.VITE_WIDY_BASE_DOMAINE}/moderation/add-user?token=${moderatorToken?.token}&moderatorId=${moderator.id}`;
	const maskedUrl = "••••••••••••••••••••••••••••••";
	const toggleLabel = isUrlVisible ? t("hide_link") : t("show_link");

	return (
		<Card
			sx={{
				marginBottom: 1,
				position: "relative",
				width: "100%",
				minHeight: 100,
			}}
		>
			<CardContent>
				<Typography variant="h5" component="div" sx={{ marginBottom: 1 }}>
					{moderator.name}
				</Typography>
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
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "end",
						position: "absolute",
						top: 0,
						right: 0,
					}}
				>
					<ConfigurationMenu
						onConfirm={async () => {
							await deleteModeratorById({ id: moderator.id }).unwrap();
						}}
						warning={t("sure_delete")}
						configurePath={`/dashboard/moderators/${moderator.id}`}
						logsPath={`/dashboard/moderators/logs/${moderator.id}`}
						isShowTest={false}
						isShowLogs={true}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};
export default ModeratorCard;

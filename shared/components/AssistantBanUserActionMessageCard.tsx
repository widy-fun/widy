import { Box, Card, Typography } from "@mui/material";
import type { IBanUserData, IClientMessage } from "@widy/sdk";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { AppState } from "../../src/store";
import getColorByMessageType from "../utils/getColorByMessageType";
import MediaTile from "./MediaTile";
import MessageDate from "./MessageDate";

const AssistantBanUserActionMessageCard = ({
	message,
	isAlertPlaying,
	isMediaPlaying,
}: {
	message: IClientMessage;
	isAlertPlaying: boolean;
	isMediaPlaying: boolean;
}) => {
	const { t } = useTranslation();
	const banedUser = message.assistant_action?.data as IBanUserData;
	const { services } = useSelector((state: AppState) => state.servicesState);

	return (
		<>
			{banedUser && (
				<Card
					sx={(theme) => ({
						display: "flex",
						position: "relative",
						border: "2px solid",
						borderRadius: 3,
						boxSizing: "border-box",
						borderColor: isAlertPlaying
							? theme.palette.primary.main
							: theme.palette.background.default,
						marginBottom: "5px",
						minHeight: "5.3rem",
						overflow: "hidden",
					})}
				>
					{isMediaPlaying && (
						<MediaTile
							message={message}
							media={message.command_action?.media}
							user_name={message.command_action?.user_name}
						/>
					)}
					<Box
						sx={{
							width: "3rem",
							display: "grid",
							placeItems: "center",
							background: getColorByMessageType(message.type),
							minHeight: "100%",
						}}
					></Box>

					<div style={{ width: "100%", padding: 15, wordBreak: "break-word" }}>
						<div style={{ float: "right" }}>
							<MessageDate createdAt={message.created_at} />
						</div>
						<Box sx={{ display: "flex", gap: 1 }}>
							<Typography
								sx={(theme) => ({
									color: theme.palette.primary.main,
								})}
							>
								{t("message.assistant_ban_user", {
									user_name: banedUser.name,
								})}
							</Typography>
						</Box>
					</div>
					<Box
						sx={{
							width: "3rem",
							display: "grid",
							placeItems: "center",
							background: services[banedUser.platform].color,
							minHeight: "100%",
						}}
					/>
				</Card>
			)}
		</>
	);
};
export default memo(AssistantBanUserActionMessageCard);

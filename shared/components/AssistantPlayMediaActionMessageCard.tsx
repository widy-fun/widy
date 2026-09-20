import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { AppEvent, type IClientMessage, type IMediaData } from "@widy/sdk";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import useAppEvents from "../hooks/useAppEvents";
import getColorByMediaType from "../utils/getColorByMediaType";
import MediaTile from "./MediaTile";
import MessageDate from "./MessageDate";

const AssistantPlayMediaActionMessageCard = ({
	message,
	isMediaPlaying,
}: {
	message: IClientMessage;
	isMediaPlaying: boolean;
}) => {
	const { t } = useTranslation();
	const eventsService = useAppEvents();
	const mediaData = message.assistant_action?.data as IMediaData;

	return (
		<>
			{mediaData && (
				<Card
					sx={(theme) => ({
						display: "flex",
						position: "relative",
						border: "2px solid",
						borderRadius: 3,
						boxSizing: "border-box",
						borderColor: theme.palette.background.default,
						marginBottom: "5px",
						minHeight: "5.3rem",
						overflow: "hidden",
					})}
				>
					{isMediaPlaying && (
						<MediaTile
							message={message}
							media={mediaData.media}
							user_name={mediaData.title}
						/>
					)}
					<Box
						sx={{
							width: "3rem",
							display: "grid",
							placeItems: "center",
							background: getColorByMediaType(mediaData.media.media_type),
							minHeight: "100%",
						}}
					>
						{!isMediaPlaying && (
							<IconButton
								onClick={() => {
									eventsService.send<IClientMessage>({
										event: AppEvent.ReplayMedia,
										data: message,
									});
								}}
							>
								<ReplayIcon />
							</IconButton>
						)}
					</Box>

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
								{t("dashboard.assistant")}
							</Typography>
						</Box>
						<div>
							<span>{mediaData.title}</span>
						</div>
					</div>
				</Card>
			)}
		</>
	);
};
export default memo(AssistantPlayMediaActionMessageCard);

import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import {
	AppEvent,
	type IClientMessage,
	type MessageId,
	RewardType,
} from "@widy/sdk";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { AppState } from "../../src/store";
import useAppEvents from "../hooks/useAppEvents";
import getColorByMediaType from "../utils/getColorByMediaType";
import getColorByMessageType from "../utils/getColorByMessageType";
import MediaTile from "./MediaTile";
import MessageDate from "./MessageDate";

const RedemptionMessageCard = ({
	message,
	isAlertPlaying,
	isMediaPlaying,
}: {
	message: IClientMessage;
	isAlertPlaying: boolean;
	isMediaPlaying: boolean;
}) => {
	const { t } = useTranslation();
	const eventsService = useAppEvents();
	const { services } = useSelector((state: AppState) => state.servicesState);
	const redemption = message.redemption;

	return (
		<>
			{redemption && (
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
							media={message.redemption?.media}
							user_name={message.redemption?.user_name}
						/>
					)}
					<Box
						sx={{
							width: "3rem",
							display: "grid",
							placeItems: "center",
							background: redemption?.media
								? getColorByMediaType(redemption.media.media_type)
								: getColorByMessageType(message.type),
							minHeight: "100%",
						}}
					>
						{redemption.media && !isMediaPlaying && !isAlertPlaying && (
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
								{t("message.redemption", {
									user_name: redemption.user_name,
									title: redemption.title,
									cost: redemption.cost,
								})}
							</Typography>
						</Box>
						<div>
							<span>{redemption.user_input}</span>
						</div>

						{redemption.type === RewardType.Alert && (
							<div
								style={{
									display: "grid",
									gridAutoFlow: "column",
									marginTop: 10,
								}}
							>
								{!isAlertPlaying && (
									<Button
										size="small"
										sx={{
											justifySelf: "start",
											fontSize: 12,
										}}
										onClick={() => {
											eventsService.send<IClientMessage>({
												event: AppEvent.ReplayAlert,
												data: message,
											});
										}}
									>
										{t("message.replay")}
									</Button>
								)}

								<Button
									size="small"
									sx={{
										justifySelf: "end",
										fontSize: 12,
									}}
									onClick={() => {
										eventsService.send<MessageId>({
											event: AppEvent.SkipAlert,
											data: message.id,
										});
									}}
								>
									{t("message.skip")}
								</Button>
							</div>
						)}
					</div>
					<Box
						sx={{
							width: "3rem",
							display: "grid",
							placeItems: "center",
							background: services[redemption.platform].color,
							minHeight: "100%",
						}}
					/>
				</Card>
			)}
		</>
	);
};
export default memo(RedemptionMessageCard);

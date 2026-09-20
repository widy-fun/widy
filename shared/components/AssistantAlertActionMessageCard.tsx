import { Box, Button, Card, Typography } from "@mui/material";
import {
	AppEvent,
	type IAlert,
	type IClientMessage,
	type MessageId,
} from "@widy/sdk";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import useAppEvents from "../hooks/useAppEvents";
import getColorByMessageType from "../utils/getColorByMessageType";
import MessageDate from "./MessageDate";

const AssistantAlertActionMessageCard = ({
	message,
	isAlertPlaying,
}: {
	message: IClientMessage;
	isAlertPlaying: boolean;
}) => {
	const { t } = useTranslation();
	const eventsService = useAppEvents();
	const alert = message.assistant_action?.data as IAlert;

	return (
		<>
			{alert && (
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
								{t("dashboard.assistant")}
							</Typography>
						</Box>
						<div>
							<span>{alert.name}</span>
						</div>

						{!!alert && (
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
				</Card>
			)}
		</>
	);
};
export default memo(AssistantAlertActionMessageCard);

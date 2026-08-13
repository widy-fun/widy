import { Box, Button, Card, Typography } from "@mui/material";
import { AppEvent, type IClientMessage, type MessageId } from "@widy/sdk";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { AppState } from "../../src/store";
import useAppEvents from "../hooks/useAppEvents";
import getColorByMessageType from "../utils/getColorByMessageType";
import MessageDate from "./MessageDate";

const CommandTtsActionMessageCard = ({
	message,
	isTtsPlaying,
}: {
	message: IClientMessage;
	isTtsPlaying: boolean;
}) => {
	const { t } = useTranslation();
	const eventsService = useAppEvents();
	const { services } = useSelector((state: AppState) => state.servicesState);
	const commandAction = message.command_action;

	return (
		<>
			{commandAction && (
				<Card
					sx={(theme) => ({
						display: "flex",
						position: "relative",
						border: "2px solid",
						borderRadius: 3,
						boxSizing: "border-box",
						borderColor: isTtsPlaying
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
								{t("message.command_action", {
									user_name: commandAction.user_name,
									command_name: commandAction.command_name,
								})}
							</Typography>
						</Box>
						<div>
							<span>{commandAction.user_input}</span>
						</div>

						<div
							style={{
								display: "grid",
								gridAutoFlow: "column",
								marginTop: 10,
							}}
						>
							{!isTtsPlaying && (
								<Button
									size="small"
									sx={{
										justifySelf: "start",
										fontSize: 12,
									}}
									onClick={() => {
										eventsService.send<IClientMessage>({
											event: AppEvent.ReplayTts,
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
										event: AppEvent.SkipTts,
										data: message.id,
									});
								}}
							>
								{t("message.skip")}
							</Button>
						</div>
					</div>
					<Box
						sx={{
							width: "3rem",
							display: "grid",
							placeItems: "center",
							background: commandAction.platform
								? services[commandAction.platform].color
								: undefined,
							minHeight: "100%",
						}}
					/>
				</Card>
			)}
		</>
	);
};
export default memo(CommandTtsActionMessageCard);

import { Box, Card, Typography } from "@mui/material";
import type { IClientMessage, Platform } from "@widy/sdk";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { AppState } from "../../src/store";
import getColorByMessageType from "../utils/getColorByMessageType";
import MessageDate from "./MessageDate";

const AssistantActionMessageCard = ({
	message,
	platform,
	text,
}: {
	message: IClientMessage;
	platform: Platform;
	text: string;
}) => {
	const { services } = useSelector((state: AppState) => state.servicesState);
	const { t } = useTranslation();

	return (
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
					<span>{text}</span>
				</div>
			</div>
			<Box
				sx={{
					width: "3rem",
					display: "grid",
					placeItems: "center",
					background: services[platform].color,
					minHeight: "100%",
				}}
			/>
		</Card>
	);
};
export default memo(AssistantActionMessageCard);

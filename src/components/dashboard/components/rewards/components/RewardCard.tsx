import SettingsIcon from "@mui/icons-material/Settings";
import {
	Box,
	Card,
	CardContent,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from "@mui/material";
import type { SerializedError } from "@reduxjs/toolkit";
import {
	AlertSeverity,
	AppEvent,
	type IClientMessage,
	type IReward,
	MediaType,
	MessageType,
} from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useAppEvents from "../../../../../../shared/hooks/useAppEvents";
import { showSnackBar } from "../../../../../../shared/slices/snackBarSlice";
import getRewardIconByRewardType from "../../../../../helpers/getRewardIconByRewardType";
import useRemoveReward from "../../../../../hooks/useRemoveReward";
import type { AppState } from "../../../../../store";
import WarningDialog from "../../../../WarningDialog";
import RewardIcon from "./RewardIcon";

const RewardCard = ({ reward }: { reward: IReward }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const removeReward = useRemoveReward(reward);
	const [dialogOpen, setDialogOpen] = useState(false);
	const dispatch = useDispatch();
	const { services } = useSelector((state: AppState) => state.servicesState);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const eventsService = useAppEvents();

	const handleTestReward = () => {
		const testMessage: IClientMessage = {
			id: crypto.randomUUID(),
			type: MessageType.Redemption,
			created_at: Date.now(),
			redemption: {
				id: crypto.randomUUID(),
				user_id: "test",
				user_name: "Test user",
				user_input: "Test",
				reward_id: crypto.randomUUID(),
				external_id: crypto.randomUUID(),
				title: reward.title,
				description: reward.description,
				cost: 100,
				platform: reward.platform,
				type: reward.type,
				points_currency_ratio: reward.points_currency_ratio,
				alert_variant: reward.alert_variant,
				audio_volume: reward.audio_volume,
				video_volume: reward.video_volume,
				duration: reward.duration,
				delay: reward.delay,
				audio: reward.audio,
				image: reward.image,
				video: reward.video,
				media: {
					url: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
					media_type: MediaType.Youtube,
					temporary_src: "oHg5SJYRHA0",
				},
			},
		};
		eventsService.send<IClientMessage>({
			event: AppEvent.Redemption,
			data: testMessage,
		});
	};

	return (
		<>
			<WarningDialog
				open={dialogOpen}
				setOpen={setDialogOpen}
				title={t("reward.delete")}
				warning={t("reward.sure_delete")}
				onClick={async () => {
					try {
						await removeReward({ id: reward.id }).unwrap();
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
			<Card
				sx={{
					width: 200,
					height: 180,
					backgroundColor: services[reward.platform].color,
					position: "relative",
					wordBreak: "break-all",
					textAlign: "center",
				}}
			>
				<CardContent>
					<Box
						sx={{
							display: "flex",
							justifyContent: "end",
							position: "absolute",
							top: 0,
							right: 0,
						}}
					>
						<IconButton onClick={handleClick}>
							<SettingsIcon />
						</IconButton>
						<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
							<MenuItem
								onClick={() => {
									navigate(`/dashboard/rewards/${reward.id}`);
								}}
							>
								{t("alert.configure")}
							</MenuItem>
							<MenuItem onClick={handleTestReward}>{t("alert.test")}</MenuItem>
							<MenuItem
								onClick={() => {
									setDialogOpen(true);
								}}
							>
								{t("alert.delete")}
							</MenuItem>
						</Menu>
					</Box>
					<Box sx={{ display: "grid", placeItems: "center" }}>
						<Box
							sx={{
								marginBottom: 1,
								width: 100,
								height: 100,
								backgroundColor: reward.background_color,
								display: "grid",
								placeItems: "center",
							}}
						>
							<Box sx={{ display: "grid", placeItems: "center", gap: 1 }}>
								{getRewardIconByRewardType({ reward, size: 28 })}
								<Box
									sx={{
										display: "flex",
										gap: "3px",
										alignItems: "center",
										backgroundColor: "rgba(0,0,0,0.2)",
										padding: "3px",
									}}
								>
									<RewardIcon size={12} />
									<Typography
										sx={{
											fontSize: 12,
										}}
									>
										{reward.cost}
									</Typography>
								</Box>
							</Box>
						</Box>
						<Box>
							<Typography
								sx={{
									fontSize: 12,
								}}
							>
								{reward.title}
							</Typography>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</>
	);
};
export default RewardCard;

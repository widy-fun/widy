import { Box, Card, CardContent, Typography } from "@mui/material";
import { AppEvent, type IClientMessage, type IReward } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useAppEvents from "../../../../../../shared/hooks/useAppEvents";
import getTestAlertMessage from "../../../../../../shared/utils/getTestAlertMessage";
import getRewardIconByRewardType from "../../../../../helpers/getRewardIconByRewardType";
import useRemoveReward from "../../../../../hooks/useRemoveReward";
import type { AppState } from "../../../../../store";
import ConfigurationMenu from "../../../../ConfigurationMenu";
import RewardIcon from "./RewardIcon";

const RewardCard = ({ reward }: { reward: IReward }) => {
	const { t } = useTranslation();
	const removeReward = useRemoveReward(reward);
	const { services } = useSelector((state: AppState) => state.servicesState);
	const eventsService = useAppEvents();
	const handleTestReward = () => {
		eventsService.send<IClientMessage>({
			event: AppEvent.Redemption,
			data: getTestAlertMessage({
				alert: reward.alert,
				userName: t("alert.test_name"),
				text: t("alert.test_text"),
				reward,
			}),
		});
	};

	return (
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
					<ConfigurationMenu
						onConfirm={async () => {
							await removeReward({ id: reward.id }).unwrap();
						}}
						warning={t("sure_delete")}
						configurePath={`/dashboard/rewards/${reward.id}`}
						onTest={handleTestReward}
					/>
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
	);
};
export default RewardCard;

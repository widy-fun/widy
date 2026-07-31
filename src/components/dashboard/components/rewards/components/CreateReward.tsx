import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	MessageType,
	Platform,
	RewardType,
	type SerializedAppError,
} from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setAlert } from "../../../../../../shared/slices/alertsSlice";
import { useKickAddCustomRewardMutation } from "../../../../../api/kickApi";
import { useGetRewardByTitleMutation } from "../../../../../api/rewardsApi";
import { useTwitchAddCustomRewardMutation } from "../../../../../api/twitchApi";
import getDefaultAlert from "../../../../../helpers/getDefaultAlert";
import type { AppState } from "../../../../../store";
import RewardSettings from "./RewardSettings";

const CreateReward = () => {
	const { t } = useTranslation();
	const { reward } = useSelector((state: AppState) => state.rewardsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [twitchAddCustomReward] = useTwitchAddCustomRewardMutation();
	const [kickAddCustomReward] = useKickAddCustomRewardMutation();
	const [getRewardByTitle] = useGetRewardByTitleMutation();

	return (
		<RewardSettings
			onSave={async () => {
				try {
					if (reward.type === RewardType.Alert) {
						dispatch(
							setAlert({
								...getDefaultAlert(),
								reward_id: reward.id,
								name: reward.title,
								type: MessageType.Redemption,
							}),
						);
						navigate("/dashboard/alerts/new/alert");
						return;
					}
					switch (reward.platform) {
						case Platform.Twitch:
							await twitchAddCustomReward({
								reward,
							}).unwrap();
							break;
						case Platform.Kick:
							{
								const oldReward = await getRewardByTitle({
									title: reward.title as string,
									platform: reward.platform,
								}).unwrap();
								if (oldReward) {
									dispatch(
										showSnackBar({
											message: t("reward.title_exist"),
											alertSeverity: AlertSeverity.warning,
										}),
									);
									return;
								}
								await kickAddCustomReward({ reward }).unwrap();
							}
							break;
					}
					dispatch(
						showSnackBar({
							message: t("success"),
							alertSeverity: AlertSeverity.success,
						}),
					);
					navigate(-1);
				} catch (error) {
					const err = error as SerializedAppError;
					dispatch(
						showSnackBar({
							message: err.message as string,
							alertSeverity: AlertSeverity.error,
						}),
					);
				}
			}}
		/>
	);
};
export default CreateReward;

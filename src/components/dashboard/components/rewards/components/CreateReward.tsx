import type { SerializedError } from "@reduxjs/toolkit";
import { AlertSeverity, Platform } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { showSnackBar } from "../../../../../../shared/slices/snackBarSlice";
import { useKickAddCustomRewardMutation } from "../../../../../api/kickApi";
import { useGetRewardByTitleMutation } from "../../../../../api/rewardsApi";
import { useTwitchAddCustomRewardMutation } from "../../../../../api/twitchApi";
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
					switch (reward.platform) {
						case Platform.Twitch:
							await twitchAddCustomReward({ reward }).unwrap();
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

						default:
							return;
					}
					dispatch(
						showSnackBar({
							message: t("success"),
							alertSeverity: AlertSeverity.success,
						}),
					);
					navigate(-1);
				} catch (error) {
					const err = error as SerializedError;
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

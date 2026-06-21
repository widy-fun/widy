import type { SerializedError } from "@reduxjs/toolkit";
import { AlertSeverity, Platform } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { showSnackBar } from "../../../../../../shared/slices/snackBarSlice";
import { useTwitchAddCustomRewardMutation } from "../../../../../api/twitchApi";
import type { AppState } from "../../../../../store";
import RewardSettings from "./RewardSettings";

const CreateReward = () => {
	const { t } = useTranslation();
	const { reward } = useSelector((state: AppState) => state.rewardsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [twitchAddCustomReward] = useTwitchAddCustomRewardMutation();

	return (
		<RewardSettings
			onSave={async () => {
				try {
					switch (reward.platform) {
						case Platform.Twitch:
							await twitchAddCustomReward({ reward }).unwrap();
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

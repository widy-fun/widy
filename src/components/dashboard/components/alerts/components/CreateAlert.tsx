import { showSnackBar } from "@widy/react";
import { AlertSeverity, type ISerializedAppError, Platform } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCreateAlertMutation } from "../../../../../api/alertsApi";
import { useKickAddCustomRewardMutation } from "../../../../../api/kickApi";
import { useGetRewardByTitleMutation } from "../../../../../api/rewardsApi";
import { useTwitchAddCustomRewardMutation } from "../../../../../api/twitchApi";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import AlertSettings from "../AlertSettings";

const CreateAlert = () => {
	const { t } = useTranslation();
	const [createAlert] = useCreateAlertMutation();
	const { alert } = useSelector((state: AppState) => state.alertsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { reward } = useSelector((state: AppState) => state.rewardsState);
	const { command } = useSelector((state: AppState) => state.commandsState);
	const [twitchAddCustomReward] = useTwitchAddCustomRewardMutation();
	const [kickAddCustomReward] = useKickAddCustomRewardMutation();
	const [getRewardByTitle] = useGetRewardByTitleMutation();

	return (
		<AlertSettings
			name={t("alert.new_variant").toUpperCase()}
			isDefault={false}
			onSave={async () => {
				try {
					if (reward.id === alert.reward_id) {
						switch (reward.platform) {
							case Platform.Twitch:
								await twitchAddCustomReward({
									reward: { ...reward, alert },
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
									await kickAddCustomReward({
										reward: { ...reward, alert },
									}).unwrap();
								}
								break;
						}
						dispatch(
							showSnackBar({
								message: t("success"),
								alertSeverity: AlertSeverity.success,
							}),
						);
						navigate("/dashboard/rewards");
					} else if (command.id === alert.command_id) {
						dispatch(setCommand({ ...command, alert }));
						navigate(-2);
					} else {
						await createAlert({ alert }).unwrap();
						dispatch(
							showSnackBar({
								message: t("success"),
								alertSeverity: AlertSeverity.success,
							}),
						);
						navigate(-1);
					}
				} catch (error) {
					const err = error as ISerializedAppError;
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
export default CreateAlert;

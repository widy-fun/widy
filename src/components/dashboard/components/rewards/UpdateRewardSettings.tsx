import type { SerializedError } from "@reduxjs/toolkit";
import { showSnackBar } from "@widy/react";
import { AlertSeverity } from "@widy/sdk";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
	useGetRewardByIdQuery,
	useUpdateRewardSettingsMutation,
} from "../../../../api/rewardsApi";
import type { AppState } from "../../../../store";
import { setReward } from "../../../../store/slices/rewardsSlice";
import RewardSettings from "./components/RewardSettings";

const UpdateRewardSettings = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { reward } = useSelector((state: AppState) => state.rewardsState);
	const { data, error: getRewardByIdError } = useGetRewardByIdQuery(
		{ id },
		{ skip: !id },
	);
	const [updateRewardSettings] = useUpdateRewardSettingsMutation();

	useEffect(() => {
		if (getRewardByIdError) {
			dispatch(
				showSnackBar({
					message: getRewardByIdError.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	}, [getRewardByIdError, dispatch]);

	useEffect(() => {
		if (data) {
			dispatch(setReward(data));
		}
	}, [data, dispatch]);

	return (
		<RewardSettings
			onSave={async () => {
				try {
					await updateRewardSettings({ reward }).unwrap();
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
			}}
		/>
	);
};
export default UpdateRewardSettings;

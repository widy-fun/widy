import { showSnackBar } from "@widy/react";
import { AlertSeverity, type ISerializedAppError } from "@widy/sdk";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
	useGetModeratorByIdQuery,
	useUpdateModeratorMutation,
} from "../../../../../api/moderatorsApi";
import type { AppState } from "../../../../../store";
import { setModerator } from "../../../../../store/slices/moderatorsSlice";
import ModeratorSettings from "./ModeratorSettings";

const UpdateModerator = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { moderator } = useSelector((state: AppState) => state.moderatorsState);
	const { data, error: getModeratorByIdError } = useGetModeratorByIdQuery(
		{ id },
		{ skip: !id },
	);
	const [updateModerator] = useUpdateModeratorMutation();

	useEffect(() => {
		if (getModeratorByIdError) {
			dispatch(
				showSnackBar({
					message: getModeratorByIdError.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	}, [getModeratorByIdError, dispatch]);

	useEffect(() => {
		if (data) {
			dispatch(setModerator(data));
		}
	}, [data, dispatch]);

	return (
		<ModeratorSettings
			onSave={async () => {
				try {
					await updateModerator({ moderator }).unwrap();
					dispatch(
						showSnackBar({
							message: t("success"),
							alertSeverity: AlertSeverity.success,
						}),
					);
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
export default UpdateModerator;

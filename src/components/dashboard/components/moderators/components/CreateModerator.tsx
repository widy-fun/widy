import { showSnackBar } from "@widy/react";
import { AlertSeverity, type ISerializedAppError } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCreateModeratorMutation } from "../../../../../api/moderatorsApi";
import type { AppState } from "../../../../../store";
import ModeratorSettings from "./ModeratorSettings";

const CreateModerator = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [createModerator] = useCreateModeratorMutation();
	const { moderator } = useSelector((state: AppState) => state.moderatorsState);

	return (
		<ModeratorSettings
			onSave={async () => {
				try {
					await createModerator({ moderator }).unwrap();
					dispatch(
						showSnackBar({
							message: t("success"),
							alertSeverity: AlertSeverity.success,
						}),
					);
					navigate(-1);
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
export default CreateModerator;

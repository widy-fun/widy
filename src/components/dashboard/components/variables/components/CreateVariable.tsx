import { showSnackBar } from "@widy/react";
import { AlertSeverity, type ISerializedAppError } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCreateVariableMutation } from "../../../../../api/variablesApi";
import type { AppState } from "../../../../../store";
import VariableSettings from "./VariableSettings";

const CreateReward = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [createVariable] = useCreateVariableMutation();
	const { variable } = useSelector((state: AppState) => state.variablesState);

	return (
		<VariableSettings
			onSave={async () => {
				try {
					await createVariable({ variable }).unwrap();
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
export default CreateReward;

import { showSnackBar } from "@widy/react";
import { AlertSeverity, type ISerializedAppError } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCreateCommandMutation } from "../../../../../api/commandsApi";
import type { AppState } from "../../../../../store";
import CommandSettings from "./CommandSettings";

const CreateCommand = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [createCommand] = useCreateCommandMutation();

	return (
		<CommandSettings
			isUpdate={false}
			onSave={async () => {
				try {
					await createCommand({ command }).unwrap();
					dispatch(
						showSnackBar({
							message: t("success"),
							alertSeverity: AlertSeverity.success,
						}),
					);
					navigate("/dashboard/commands");
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
export default CreateCommand;

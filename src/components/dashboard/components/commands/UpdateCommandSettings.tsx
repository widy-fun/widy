import { showSnackBar } from "@widy/react";
import { AlertSeverity, type ISerializedAppError } from "@widy/sdk";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
	useGetCommandByIdQuery,
	useUpdateCommandMutation,
} from "../../../../api/commandsApi";
import type { AppState } from "../../../../store";
import { setCommand } from "../../../../store/slices/commandsSlice";
import CommandSettings from "./components/CommandSettings";

const UpdateCommandSettings = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const { data, error: getCommandByIdError } = useGetCommandByIdQuery(
		{ id },
		{ skip: !id },
	);
	const [updateCommand] = useUpdateCommandMutation();

	useEffect(() => {
		if (getCommandByIdError) {
			dispatch(
				showSnackBar({
					message: getCommandByIdError.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	}, [getCommandByIdError, dispatch]);

	useEffect(() => {
		if (data && data.id !== command.id) {
			dispatch(setCommand(data));
		}
	}, [data, dispatch, command.id]);

	return (
		<CommandSettings
			isUpdate={true}
			onSave={async () => {
				try {
					await updateCommand({ command }).unwrap();
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
export default UpdateCommandSettings;

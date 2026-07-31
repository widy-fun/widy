import { showSnackBar } from "@widy/react";
import { AlertSeverity, type SerializedAppError } from "@widy/sdk";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setAlert } from "../../../../../shared/slices/alertsSlice";
import {
	useGetAlertByIdQuery,
	useUpdateAlertSettingsMutation,
} from "../../../../api/alertsApi";
import type { AppState } from "../../../../store";
import { setCommand } from "../../../../store/slices/commandsSlice";
import AlertSettings from "./AlertSettings";

const UpdateAlertSettings = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { alert } = useSelector((state: AppState) => state.alertsState);
	const { command } = useSelector((state: AppState) => state.commandsState);
	const { data, error: getAlertByIdError } = useGetAlertByIdQuery(
		{ id },
		{ skip: !id },
	);
	const [updateAlertSettings] = useUpdateAlertSettingsMutation();

	useEffect(() => {
		if (getAlertByIdError) {
			dispatch(
				showSnackBar({
					message: getAlertByIdError.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	}, [getAlertByIdError, dispatch]);

	useEffect(() => {
		if (data) {
			dispatch(setAlert(data));
		}
	}, [data, dispatch]);

	return (
		<AlertSettings
			name={alert.name.toUpperCase()}
			isDefault={alert.id === "ba234e82-7a86-4f77-850b-f2d739902595"}
			onSave={async () => {
				try {
					if (command.id === alert.command_id) {
						dispatch(setCommand({ ...command, alert }));
						navigate(-2);
					} else {
						await updateAlertSettings({ alert }).unwrap();
						dispatch(
							showSnackBar({
								message: t("success"),
								alertSeverity: AlertSeverity.success,
							}),
						);
					}
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
		></AlertSettings>
	);
};
export default UpdateAlertSettings;

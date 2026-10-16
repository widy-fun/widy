import { showSnackBar } from "@widy/react";
import { AlertSeverity, type ISerializedAppError } from "@widy/sdk";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
	useGetVariableByIdQuery,
	useUpdateVariableMutation,
} from "../../../../../api/variablesApi";
import type { AppState } from "../../../../../store";
import { setVariable } from "../../../../../store/slices/variablesSlice";
import VariableSettings from "./VariableSettings";

const UpdateVariable = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { variable } = useSelector((state: AppState) => state.variablesState);
	const { data, error: getVariableByIdError } = useGetVariableByIdQuery(
		{ id },
		{ skip: !id },
	);
	const [updateVariable] = useUpdateVariableMutation();

	useEffect(() => {
		if (getVariableByIdError) {
			dispatch(
				showSnackBar({
					message: getVariableByIdError.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	}, [getVariableByIdError, dispatch]);

	useEffect(() => {
		if (data) {
			dispatch(setVariable(data));
		}
	}, [data, dispatch]);

	return (
		<VariableSettings
			onSave={async () => {
				try {
					await updateVariable({ variable }).unwrap();
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
export default UpdateVariable;

import { showSnackBar } from "@widy/react";
import { AlertSeverity, CommandSourceType, ServiceType } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetServiceByIdQuery } from "../../../../../api/servicesApi";
import { DEFAULT_OBS_ACTION } from "../../../../../constants";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import styles from "../../settings/Settings.module.css";
import ObsActionSettings from "./ObsActionSettings";

const ObsAction = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [obsAction, setObsAction] = useState(DEFAULT_OBS_ACTION);
	const { data: obsService } = useGetServiceByIdQuery(
		{
			id: ServiceType.Obs,
		},
		{ refetchOnMountOrArgChange: true },
	);

	useEffect(() => {
		if (command.obs_action) {
			setObsAction(command.obs_action);
		}
	}, [command.obs_action]);

	return (
		<>
			<h1>{t("obs_action.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<ObsActionSettings
						obs_action={obsAction}
						onObsActionChange={(obs_action) => {
							setObsAction(obs_action);
						}}
					/>
					<LeftRightButtons
						onLeft={() => {
							if (!obsService?.authorized) {
								dispatch(
									showSnackBar({
										message: t("command.you_need_connect_first", {
											service: ServiceType.Obs,
										}),
										alertSeverity: AlertSeverity.warning,
									}),
								);
								return;
							}
							if (command.source_type === CommandSourceType.None) {
								dispatch(
									showSnackBar({
										message: t("command.select_source_first"),
										alertSeverity: AlertSeverity.warning,
									}),
								);
								return;
							}
							if (command.source_type === CommandSourceType.Chat) {
								dispatch(
									setCommand({
										...command,
										obs_action: obsAction,
									}),
								);
								navigate(-1);
							} else {
								dispatch(
									showSnackBar({
										message: t("command.not_work_with_selected_source"),
										alertSeverity: AlertSeverity.warning,
									}),
								);
							}
						}}
						OnRight={() => {
							dispatch(
								setCommand({
									...command,
									telegram_bot_action: undefined,
								}),
							);
							navigate(-1);
						}}
						leftText={t("ok")}
						rightText={t("cancel")}
					/>
				</div>
			</div>
		</>
	);
};
export default ObsAction;

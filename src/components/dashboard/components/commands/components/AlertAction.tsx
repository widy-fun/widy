import { MessageType } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setAlert } from "../../../../../../shared/slices/alertsSlice";
import { useDeleteAlertByIdMutation } from "../../../../../api/alertsApi";
import getDefaultAlert from "../../../../../helpers/getDefaultAlert";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import styles from "../../settings/Settings.module.css";

const AlertAction = ({ isUpdate }: { isUpdate: boolean }) => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const { alert } = useSelector((state: AppState) => state.alertsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [deleteAlertById] = useDeleteAlertByIdMutation();

	return (
		<>
			<h1>{t("alert_action.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<LeftRightButtons
						onLeft={() => {
							dispatch(
								setAlert({
									...getDefaultAlert(),
									command_id: command.id,
									name: command.name,
									type: MessageType.CommandAction,
								}),
							);
							if (isUpdate && command.id === alert.command_id) {
								navigate(`/dashboard/alerts/${command.alert?.id}`);
								return;
							}
							navigate("/dashboard/alerts/new/alert");
						}}
						OnRight={async () => {
							try {
								if (command.alert) {
									await deleteAlertById({
										id: command.alert.id,
									}).unwrap();
								}
							} finally {
								dispatch(
									setCommand({
										...command,
										alert: undefined,
									}),
								);
								navigate(-1);
							}
						}}
						leftText={isUpdate ? t("update") : t("create")}
						rightText={t("cancel")}
					/>
				</div>
			</div>
		</>
	);
};
export default AlertAction;

import { Card, Switch, useTheme } from "@mui/material";
import type { IAlert, IClientMessage } from "@widy/sdk";
import { AppEvent } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import useAppEvents from "../../../../../../shared/hooks/useAppEvents";
import getColorByMessageType from "../../../../../../shared/utils/getColorByMessageType";
import getTestAlertMessage from "../../../../../../shared/utils/getTestAlertMessage";
import {
	useDeleteAlertByIdMutation,
	useUpdateAlertSettingsMutation,
} from "../../../../../api/alertsApi";
import ConfigurationMenu from "../../../../ConfigurationMenu";

const AlertCard = ({ alert }: { alert: IAlert }) => {
	const [updateAlertSettings] = useUpdateAlertSettingsMutation();
	const eventsService = useAppEvents();
	const { t } = useTranslation();
	const theme = useTheme();
	const handleTestAlert = () => {
		eventsService.send<IClientMessage>({
			event: AppEvent.Alert,
			data: getTestAlertMessage({
				alert,
				userName: t("alert.test_name"),
				text: t("alert.test_text"),
			}),
		});
	};
	const [deleteAlertById] = useDeleteAlertByIdMutation();

	return (
		<Card
			sx={{
				display: "flex",
				border: "1px solid",
				borderRadius: 3,
				borderColor: theme.palette.background.default,
				minWidth: 200,
				minHeight: "5.3rem",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					display: "flex",
					placeItems: "center",
					width: "3rem",
					background: getColorByMessageType(alert.type),
					minHeight: "100%",
				}}
			></div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
					paddingLeft: 10,
				}}
			>
				<span>{alert.name}</span>

				<div
					style={{ alignSelf: "center", justifySelf: "end", display: "flex" }}
				>
					<Switch
						checked={alert.status}
						onChange={async (_, value) => {
							await updateAlertSettings({
								alert: { ...alert, status: value },
							}).unwrap();
						}}
					/>
					<ConfigurationMenu
						onConfirm={async () => {
							await deleteAlertById({ id: alert.id }).unwrap();
						}}
						warning={t("sure_delete")}
						configurePath={`/dashboard/alerts/${alert.id}`}
						onTest={handleTestAlert}
					/>
				</div>
			</div>
		</Card>
	);
};
export default AlertCard;

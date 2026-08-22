import { Box } from "@mui/material";
import { showSnackBar } from "@widy/react";
import { AlertSeverity } from "@widy/sdk";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useGetAlertsQuery } from "../../../../api/alertsApi";
import groupAlertsByGroupId from "../../../../utils/groupAlertsByGroupId";
import AlertsGroup from "./AlertsGroup";
import AddNewAlertVariantButton from "./components/AddNewAlertVariantButton";

const Alerts = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { data, error } = useGetAlertsQuery();

	useEffect(() => {
		if (error) {
			dispatch(
				showSnackBar({
					message: error.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	}, [dispatch, error]);
	return (
		<>
			<h1>{t("alerts.title")}</h1>
			<Box sx={{ display: "grid", placeItems: "center", marginBottom: 1 }}>
				<AddNewAlertVariantButton group_id={"1"} />
			</Box>
			{groupAlertsByGroupId(data ?? []).map((alertsGroup) => (
				<AlertsGroup alertsGroup={alertsGroup} key={alertsGroup.group_id} />
			))}
		</>
	);
};
export default Alerts;

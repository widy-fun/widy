import { Button, CircularProgress } from "@mui/material";
import { openUrl } from "@tauri-apps/plugin-opener";
import { showSnackBar } from "@widy/react";
import { AlertSeverity } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
	useGetTwitchBotDeviceCodeQuery,
	useGetTwitchBotTokenMutation,
	useTwitchBotConnectMutation,
} from "../../../api/twitchBotApi";

const DeviceCode = () => {
	const {
		data: deviceCodeResponse,
		error,
		refetch,
	} = useGetTwitchBotDeviceCodeQuery();
	const [requestedAt, setRequestedAt] = useState(Date.now());
	const [getTwitchBotToken, { isSuccess: isSuccessToken }] =
		useGetTwitchBotTokenMutation();
	const [twitchBotConnect] = useTwitchBotConnectMutation();
	const [isPullingToken, setIsPullingToken] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect(() => {
		if (error) {
			dispatch(
				showSnackBar({
					message: error.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	}, [error, dispatch]);

	useEffect(() => {
		if (!deviceCodeResponse) return;
		const interval = setInterval(async () => {
			if (deviceCodeResponse.expires_in * 1000 < Date.now() - requestedAt) {
				setIsPullingToken(false);
				dispatch(
					showSnackBar({
						message: t("twitch.device_code_expired"),
						alertSeverity: AlertSeverity.warning,
					}),
				);
				refetch();
				setRequestedAt(Date.now());
				return;
			}
			if (isPullingToken && !isSuccessToken) {
				try {
					await getTwitchBotToken({
						deviceCode: deviceCodeResponse.device_code as string,
					}).unwrap();
					await twitchBotConnect().unwrap();
					setIsPullingToken(false);
					navigate(-1);
				} catch {
					return;
				}
			}
		}, deviceCodeResponse.interval * 1000);

		return () => clearInterval(interval);
	}, [
		t,
		isPullingToken,
		isSuccessToken,
		deviceCodeResponse,
		getTwitchBotToken,
		navigate,
		dispatch,
		refetch,
		twitchBotConnect,
		requestedAt,
	]);

	if (!deviceCodeResponse) {
		return (
			<div style={{ display: "flex", placeContent: "center" }}>
				<CircularProgress />
			</div>
		);
	}
	return (
		<>
			<div style={{ textAlign: "center" }}>
				{t("twitch.user_code")}: {deviceCodeResponse.user_code}
			</div>
			<Button
				variant="contained"
				disabled={!deviceCodeResponse || isPullingToken}
				onClick={() => {
					if (!deviceCodeResponse) return;
					setIsPullingToken(true);
					openUrl(deviceCodeResponse.verification_uri);
				}}
			>
				{!isPullingToken
					? t("twitch.authorize_with_code")
					: t("twitch.waiting_authorization")}
			</Button>
		</>
	);
};
export default DeviceCode;

import { Button, TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	type IKickSessionToken,
	type ISerializedAppError,
	ServiceType,
} from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useKickSessionConnectMutation } from "../../../api/kickSessionApi";
import {
	useGetServiceByIdQuery,
	useUpdateServiceAuthMutation,
} from "../../../api/servicesApi";
import YouCanFindByUrl from "../../YouCanFindByUrl";

const SessionToken = () => {
	const { t } = useTranslation();
	const { data } = useGetServiceByIdQuery({ id: ServiceType.KickSession });
	const [updateServiceAuth] = useUpdateServiceAuthMutation();
	const [kickSessionConnect] = useKickSessionConnectMutation();
	const [sessionToken, setSessionToken] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			{data && (
				<>
					<TextField
						placeholder={t("session_token")}
						value={sessionToken}
						type="password"
						onChange={(e) => setSessionToken(e.target.value)}
					/>
					<Button
						variant="contained"
						onClick={async () => {
							try {
								if (!sessionToken) {
									return;
								}
								await updateServiceAuth({
									id: ServiceType.KickSession,
									auth: { session_token: sessionToken } as IKickSessionToken,
									authorized: false,
								}).unwrap();
								await kickSessionConnect().unwrap();
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
					>
						{t("save")}
					</Button>
					<YouCanFindByUrl
						url={"https://docs.widy.fun/next/guide/kick-session-token"}
					/>
				</>
			)}
		</>
	);
};
export default SessionToken;

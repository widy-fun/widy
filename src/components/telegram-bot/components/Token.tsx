import { Button, TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	type ISerializedAppError,
	type ITokenAuth,
	ServiceType,
} from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
	useGetServiceByIdQuery,
	useUpdateServiceAuthMutation,
} from "../../../api/servicesApi";
import { useTelegramBotConnectMutation } from "../../../api/telegramBotApi";
import YouCanFindByUrl from "../../YouCanFindByUrl";

const Token = () => {
	const { t } = useTranslation();
	const { data } = useGetServiceByIdQuery({ id: ServiceType.TelegramBot });
	const [updateServiceAuth] = useUpdateServiceAuthMutation();
	const [telegramBotConnect, { isLoading }] = useTelegramBotConnectMutation();
	const [token, setToken] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			{data && (
				<>
					<TextField
						disabled={isLoading}
						placeholder={t("token")}
						value={token}
						type="password"
						onChange={(e) => setToken(e.target.value)}
					/>
					<Button
						disabled={isLoading}
						variant="contained"
						onClick={async () => {
							try {
								if (!token) {
									return;
								}
								await updateServiceAuth({
									id: ServiceType.TelegramBot,
									auth: { token } as ITokenAuth,
									authorized: false,
								}).unwrap();
								await telegramBotConnect().unwrap();
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
					<YouCanFindByUrl url={"https://telegram.me/BotFather"} />
				</>
			)}
		</>
	);
};
export default Token;

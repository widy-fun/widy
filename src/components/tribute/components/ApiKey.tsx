import { Button, TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	type ISerializedAppError,
	type ITributeAuth,
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
import { useTributeConnectMutation } from "../../../api/tributeApi";
import YouCanFindByUrl from "../../YouCanFindByUrl";

const ApiKey = () => {
	const { t } = useTranslation();
	const { data } = useGetServiceByIdQuery({ id: ServiceType.Tribute });
	const [updateServiceAuth] = useUpdateServiceAuthMutation();
	const [tributeConnect] = useTributeConnectMutation();
	const [apiKey, setApiKey] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			{data && (
				<>
					<TextField
						placeholder={t("api_key")}
						value={apiKey}
						type="password"
						onChange={(e) => setApiKey(e.target.value)}
					/>
					<Button
						variant="contained"
						onClick={async () => {
							try {
								if (!apiKey) {
									return;
								}
								await updateServiceAuth({
									id: ServiceType.Tribute,
									auth: { api_key: apiKey } as ITributeAuth,
									authorized: false,
								}).unwrap();
								await tributeConnect().unwrap();
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
						url={
							"https://wiki.tribute.tg/for-content-creators/api-documentation"
						}
					/>
				</>
			)}
		</>
	);
};
export default ApiKey;

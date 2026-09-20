import { Button, TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	type IApiKeyAuth,
	type ISerializedAppError,
	ServiceType,
} from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useClaudeConnectMutation } from "../../../api/claudeApi";
import {
	useGetServiceByIdQuery,
	useUpdateServiceAuthMutation,
} from "../../../api/servicesApi";
import YouCanFindByUrl from "../../YouCanFindByUrl";

const ApiKey = () => {
	const { t } = useTranslation();
	const { data } = useGetServiceByIdQuery({ id: ServiceType.Claude });
	const [updateServiceAuth] = useUpdateServiceAuthMutation();
	const [claudeConnect] = useClaudeConnectMutation();
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
									id: ServiceType.Claude,
									auth: { api_key: apiKey } as IApiKeyAuth,
									authorized: false,
								}).unwrap();
								await claudeConnect().unwrap();
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
					<YouCanFindByUrl url={"https://platform.claude.com/settings/keys"} />
				</>
			)}
		</>
	);
};
export default ApiKey;

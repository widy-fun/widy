import { Button, TextField } from "@mui/material";
import type { SerializedError } from "@reduxjs/toolkit";
import { AlertSeverity, ServiceType } from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { showSnackBar } from "../../../../shared/slices/snackBarSlice";
import { useDonatePayConnectMutation } from "../../../api/donatePayApi";
import {
	useGetServiceByIdQuery,
	useUpdateServiceAuthMutation,
} from "../../../api/servicesApi";
import YouCanFindByUrl from "../../YouCanFindByUrl";

const Token = () => {
	const { t } = useTranslation();
	const { data } = useGetServiceByIdQuery({ id: ServiceType.DonatePay });
	const [updateServiceAuth] = useUpdateServiceAuthMutation();
	const [donatePayConnect] = useDonatePayConnectMutation();
	const [token, setToken] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			{data && (
				<>
					<TextField
						placeholder="Token"
						value={token}
						type="password"
						onChange={(e) => setToken(e.target.value)}
					/>
					<Button
						variant="contained"
						onClick={async () => {
							try {
								if (!token) {
									return;
								}
								await updateServiceAuth({
									id: ServiceType.DonatePay,
									auth: { access_token: token },
									authorized: false,
								}).unwrap();
								await donatePayConnect().unwrap();
								navigate(-1);
							} catch (error) {
								const err = error as SerializedError;
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
					<YouCanFindByUrl url={"https://donatepay.ru/page/api"} />
				</>
			)}
		</>
	);
};
export default Token;

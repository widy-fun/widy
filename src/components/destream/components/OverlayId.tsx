import { Button, TextField } from "@mui/material";
import type { SerializedError } from "@reduxjs/toolkit";
import { showSnackBar } from "@widy/react";
import { AlertSeverity, type IDestreamAuth, ServiceType } from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useDestreamConnectMutation } from "../../../api/destreamApi";
import {
	useGetServiceByIdQuery,
	useUpdateServiceAuthMutation,
} from "../../../api/servicesApi";
import YouCanFindByUrl from "../../YouCanFindByUrl";

const OverlayId = () => {
	const { t } = useTranslation();
	const { data } = useGetServiceByIdQuery({ id: ServiceType.Destream });
	const [updateServiceAuth] = useUpdateServiceAuthMutation();
	const [destreamConnect] = useDestreamConnectMutation();
	const [overlayid, setOverlayId] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			{data && (
				<>
					<TextField
						placeholder={t("overlay_id")}
						value={overlayid}
						type="password"
						onChange={(e) => setOverlayId(e.target.value)}
					/>
					<Button
						variant="contained"
						onClick={async () => {
							try {
								if (!overlayid) {
									return;
								}
								await updateServiceAuth({
									id: ServiceType.Destream,
									auth: { overlayid } as IDestreamAuth,
									authorized: false,
								}).unwrap();
								await destreamConnect().unwrap();
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
					<YouCanFindByUrl url={"https://destream.net/overlays"} />
				</>
			)}
		</>
	);
};
export default OverlayId;

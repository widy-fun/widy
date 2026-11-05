import { Button, TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	type IObsAuth,
	type ISerializedAppError,
	ServiceType,
} from "@widy/sdk";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useObsConnectMutation } from "../../../api/obsApi";
import {
	useGetServiceByIdQuery,
	useUpdateServiceAuthMutation,
} from "../../../api/servicesApi";
import YouCanFindByUrl from "../../YouCanFindByUrl";

const ServerSettings = () => {
	const { t } = useTranslation();
	const { data } = useGetServiceByIdQuery({ id: ServiceType.Obs });
	const [updateServiceAuth] = useUpdateServiceAuthMutation();
	const [obsConnect, { isLoading }] = useObsConnectMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { handleSubmit, register, control } = useForm<IObsAuth>({
		defaultValues: {
			ip: "127.0.0.1",
			port: 4455,
			password: "",
		},
	});

	const onSubmit = handleSubmit(async (auth) => {
		try {
			await updateServiceAuth({
				id: ServiceType.Obs,
				auth,
				authorized: false,
			}).unwrap();
			await obsConnect().unwrap();
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
	});

	return (
		<>
			{data && (
				<form style={{ display: "grid", gap: 5 }} onSubmit={onSubmit}>
					<TextField
						disabled={isLoading}
						placeholder={t("server_ip")}
						autoComplete="off"
						required
						{...register("ip")}
					/>
					<Controller
						name="port"
						control={control}
						rules={{
							required: true,
							min: 1,
							max: 65535,
						}}
						render={({
							field: { onChange, onBlur, value, name, ref },
							fieldState: { error },
						}) => (
							<NumericFormat
								customInput={TextField}
								name={name}
								value={value ?? ""}
								getInputRef={ref}
								onBlur={onBlur}
								onValueChange={(values) => onChange(values.floatValue)}
								disabled={isLoading}
								placeholder={t("server_port")}
								autoComplete="off"
								allowNegative={false}
								decimalScale={0}
								required
								error={!!error}
							/>
						)}
					/>
					<TextField
						disabled={isLoading}
						placeholder={t("password")}
						autoComplete="off"
						type="password"
						{...register("password")}
					/>
					<Button variant="contained" type="submit">
						{t("save")}
					</Button>
					<YouCanFindByUrl url={"https://docs.widy.fun/obs-connection"} />
				</form>
			)}
		</>
	);
};
export default ServerSettings;

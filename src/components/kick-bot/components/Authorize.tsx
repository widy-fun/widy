import { Button } from "@mui/material";
import { ServiceType } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useKickBotAuthorizeMutation } from "../../../api/kickBotApi";
import { useGetServiceWithAuthByIdQuery } from "../../../api/servicesApi";

const Authorize = () => {
	const [kickBotAuthorize] = useKickBotAuthorizeMutation();
	const { t } = useTranslation();
	const [isAuthorizing, setIsAuthorizing] = useState(false);
	const navigate = useNavigate();
	const { data } = useGetServiceWithAuthByIdQuery(
		{ id: ServiceType.KickBot },
		{ pollingInterval: 1000 },
	);

	useEffect(() => {
		if (data?.auth) {
			navigate(-1);
		}
	}, [data, navigate]);

	return (
		<Button
			disabled={isAuthorizing}
			variant="contained"
			onClick={() => {
				setIsAuthorizing(true);
				kickBotAuthorize();
			}}
		>
			{t("authorize")}
		</Button>
	);
};
export default Authorize;

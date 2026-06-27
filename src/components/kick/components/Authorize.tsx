import { Button } from "@mui/material";
import { ServiceType } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useKickAuthorizeMutation } from "../../../api/kickApi";
import { useGetServiceWithAuthByIdQuery } from "../../../api/servicesApi";

const Authorize = () => {
	const [kickAuthorize] = useKickAuthorizeMutation();
	const { t } = useTranslation();
	const [isAuthorizing, setIsAuthorizing] = useState(false);
	const navigate = useNavigate();
	const { data } = useGetServiceWithAuthByIdQuery(
		{ id: ServiceType.Kick },
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
				kickAuthorize();
			}}
		>
			{t("authorize")}
		</Button>
	);
};
export default Authorize;

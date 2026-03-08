import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const YouCanFindByUrl = ({ url }: { url: string }) => {
	const { t } = useTranslation();

	return (
		<Typography
			sx={{
				fontSize: 12,
				wordBreak: "break-all",
				textAlign: "center",
				color: (theme) => theme.palette.primary.main,
			}}
		>
			{t("authorization.you_can_find_by_url")} : {url}
		</Typography>
	);
};
export default YouCanFindByUrl;

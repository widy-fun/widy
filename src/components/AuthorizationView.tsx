import { Box, useMediaQuery, useTheme } from "@mui/material";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import NavigateBackButton from "./NavigateBackButton";

const AuthorizationView = ({ children }: { children: ReactNode }) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const { t } = useTranslation();

	return (
		<>
			<NavigateBackButton />
			<Box
				sx={{
					display: "grid",
					overflow: "hidden",
					textAlign: "center",
					placeContent: "center",
				}}
			>
				<h1>{t("authorization.title")}</h1>

				<div
					style={{
						width: matches ? 300 : 500,
						display: "grid",
						gap: 15,

						textAlign: "start",
					}}
				>
					{children}
				</div>
			</Box>
		</>
	);
};
export default AuthorizationView;

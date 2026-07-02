import WarningIcon from "@mui/icons-material/Warning";
import { Box } from "@mui/material";
import type { IManifest } from "@widy/sdk";
import { useTranslation } from "react-i18next";

const WidgetWarning = ({ manifest }: { manifest: IManifest }) => {
	const { t } = useTranslation();
	const connection_src = manifest.csp?.connect_src ?? [];
	const img_src = manifest.csp?.img_src ?? [];
	const media_src = manifest.csp?.media_src ?? [];
	const connection = connection_src.concat(img_src).concat(media_src);

	return (
		<Box sx={{ display: "grid", gap: 1 }}>
			{t("widgets.add_confirm", { widget_name: manifest.name })}
			<Box>
				{manifest.scopes.map((scope) => (
					<Box
						key={scope}
						sx={(theme) => ({
							display: "flex",
							alignItems: "center",
							color: theme.palette.warning.main,
							fontSize: 14,
							gap: 0.5,
						})}
					>
						<WarningIcon sx={{ fontSize: 14 }} />
						{t(`scopes.${scope}`)}
					</Box>
				))}
			</Box>
			{!!connection.length && (
				<Box>
					{t("widgets.widget_connection")}
					{connection.map((src) => (
						<Box sx={{ color: "red", fontSize: 14 }} key={src}>
							{src}
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
};
export default WidgetWarning;

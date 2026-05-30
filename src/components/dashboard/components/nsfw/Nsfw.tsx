import SettingsIcon from "@mui/icons-material/Settings";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "../../../TabPanel";
import WidgetUrl from "../alerts/components/WidgetUrl";
import NsfwSettings from "./components/NsfwSettings";
import NsfwWindow from "./components/NsfwWindow";

const Nsfw = () => {
	const [value, setValue] = useState(0);
	const { t } = useTranslation();

	return (
		<>
			<h1>{t("nsfw.title")}</h1>
			<WidgetUrl
				widgetUrl={"http://localhost:12553/nsfw"}
				text={t("widget.url")}
			/>
			<Box
				sx={{
					borderBottom: 1,
					borderColor: "divider",
					background: "wh",
					display: "grid",
					placeContent: "center",
				}}
			>
				<Tabs
					value={value}
					variant="scrollable"
					allowScrollButtonsMobile
					onChange={(_, value) => setValue(value)}
					slotProps={{
						indicator: { style: { transition: "none" } },
					}}
				>
					<Tab
						icon={<WebAssetIcon />}
						iconPosition="start"
						label={t("nsfw.nsfw_window")}
					/>
					<Tab
						icon={<SettingsIcon />}
						iconPosition="start"
						label={t("nsfw.settings")}
					/>
				</Tabs>
			</Box>
			<div style={{ marginTop: 20 }}>
				<TabPanel index={0} value={value}>
					<NsfwWindow />
				</TabPanel>
				<TabPanel index={1} value={value}>
					<NsfwSettings />
				</TabPanel>
			</div>
		</>
	);
};
export default Nsfw;

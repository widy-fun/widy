import MicIcon from "@mui/icons-material/Mic";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "../../../TabPanel";
import AssistantDevice from "./components/AssistantDevice";
import AssistantSettings from "./components/AssistantSettings";

const Assistant = () => {
	const [value, setValue] = useState(0);
	const { t } = useTranslation();

	return (
		<>
			<h1>{t("assistant.title")}</h1>

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
						icon={<MicIcon />}
						iconPosition="start"
						label={t("assistant.device")}
					/>
					<Tab
						icon={<SettingsIcon />}
						iconPosition="start"
						label={t("assistant.settings")}
					/>
				</Tabs>
			</Box>
			<div style={{ marginTop: 20 }}>
				<TabPanel index={0} value={value}>
					<AssistantDevice />
				</TabPanel>
				<TabPanel index={1} value={value}>
					<AssistantSettings />
				</TabPanel>
			</div>
		</>
	);
};
export default Assistant;

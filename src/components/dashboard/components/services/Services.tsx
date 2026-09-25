import SensorsIcon from "@mui/icons-material/Sensors";
import SensorsOffIcon from "@mui/icons-material/SensorsOff";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "../../../TabPanel";
import ConnectedServices from "./components/ConnectedServices";
import AllServices from "./components/NotConnectedServices";

const Services = () => {
	const { t } = useTranslation();
	const [value, setValue] = useState(0);

	return (
		<>
			<h1>{t("services.title")}</h1>
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
						icon={<SensorsIcon />}
						iconPosition="start"
						label={t("services.connected")}
					/>
					<Tab
						icon={<SensorsOffIcon />}
						iconPosition="start"
						label={t("services.not_connected")}
					/>
				</Tabs>
			</Box>
			<div style={{ marginTop: 20 }}>
				<TabPanel index={0} value={value}>
					<ConnectedServices />
				</TabPanel>
				<TabPanel index={1} value={value}>
					<AllServices />
				</TabPanel>
			</div>
		</>
	);
};
export default Services;

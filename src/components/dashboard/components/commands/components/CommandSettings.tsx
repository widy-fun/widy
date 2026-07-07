import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { AppState } from "../../../../../store";
import TabPanel from "../../../../TabPanel";
import CommandAction from "./CommandAction";
import CommandGeneralSettings from "./CommandGeneralSettings";
import CommandSource from "./CommandSource";

const CommandSettings = ({ onSave }: { onSave: () => void }) => {
	const navigate = useNavigate();
	const [value, setValue] = useState(0);
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);

	return (
		<>
			{command && (
				<>
					<h3 style={{ height: 20 }}>{command.name.toUpperCase()}</h3>
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
								icon={<SettingsIcon />}
								iconPosition="start"
								label={t("general")}
							/>
							<Tab
								icon={<DeviceHubIcon />}
								iconPosition="start"
								label={t("command.source")}
							/>
							<Tab
								icon={<ElectricBoltIcon />}
								iconPosition="start"
								label={t("command.action")}
							/>
						</Tabs>
					</Box>
					<div style={{ marginTop: 20 }}>
						<TabPanel index={0} value={value}>
							<CommandGeneralSettings />
						</TabPanel>
						<TabPanel index={1} value={value}>
							<CommandSource />
						</TabPanel>
						<TabPanel index={2} value={value}>
							<CommandAction />
						</TabPanel>
					</div>

					<div
						style={{
							display: "flex",
							gap: 20,
							justifyContent: "center",
							marginTop: 20,
						}}
					>
						<Button variant="contained" onClick={onSave}>
							{t("save")}
						</Button>
						<Button onClick={() => navigate(-1)}>{t("back")}</Button>
					</div>
				</>
			)}
		</>
	);
};
export default CommandSettings;

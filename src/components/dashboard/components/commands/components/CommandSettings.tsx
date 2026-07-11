import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { AppState } from "../../../../../store";
import { setTabIndex } from "../../../../../store/slices/commandsSlice";
import TabPanel from "../../../../TabPanel";
import CommandAction from "./CommandAction";
import CommandGeneralSettings from "./CommandGeneralSettings";
import CommandSource from "./CommandSource";

const CommandSettings = ({ onSave }: { onSave: () => void }) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { command, tabIndex } = useSelector(
		(state: AppState) => state.commandsState,
	);
	const dispatch = useDispatch();

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
							value={tabIndex}
							variant="scrollable"
							allowScrollButtonsMobile
							onChange={(_, value) => dispatch(setTabIndex(value))}
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
						<TabPanel index={0} value={tabIndex}>
							<CommandGeneralSettings />
						</TabPanel>
						<TabPanel index={1} value={tabIndex}>
							<CommandSource />
						</TabPanel>
						<TabPanel index={2} value={tabIndex}>
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

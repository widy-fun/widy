import ImageIcon from "@mui/icons-material/Image";
import SettingsIcon from "@mui/icons-material/Settings";
import TitleIcon from "@mui/icons-material/Title";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { convertFileSrc } from "@tauri-apps/api/core";
import type { IAlert, IClientMessage } from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AlertView from "../../../../../shared/components/AlertView";
import { setAlert } from "../../../../../shared/slices/alertsSlice";
import getTestAlertMessage from "../../../../../shared/utils/getTestAlertMessage";
import type { AppState } from "../../../../store";
import TabPanel from "../../../TabPanel";
import AlertVariantSettings from "./components/AlertVariantSettings";
import GeneralSettings from "./components/GeneralSettings";
import MessageStyle from "./components/MessageStyle";
import TitleStyle from "./components/TitleStyle";
import ViewSettings from "./components/ViewSettings";

const AlertSettings = ({
	name,
	isDefault,
	onSave,
}: {
	name: string;
	isDefault: boolean;
	onSave: () => void;
}) => {
	const navigate = useNavigate();
	const [value, setValue] = useState(0);
	const { t } = useTranslation();
	const { alert } = useSelector((state: AppState) => state.alertsState);
	const { appDataDir } = useSelector((state: AppState) => state.mainState);
	const dispatch = useDispatch();
	const base = convertFileSrc(`${appDataDir}/static`);

	return (
		<>
			<h3 style={{ height: 20 }}>{name}</h3>
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
						icon={<ViewCarouselIcon />}
						iconPosition="start"
						label={t("alert.view")}
					/>
					<Tab
						icon={<ImageIcon />}
						iconPosition="start"
						label={t("alert.variant")}
					/>
					<Tab
						icon={<TitleIcon />}
						iconPosition="start"
						label={t("alert.title")}
					/>
					<Tab
						icon={<TitleIcon />}
						iconPosition="start"
						label={t("alert.message")}
					/>
					{!isDefault && (
						<Tab
							icon={<SettingsIcon />}
							iconPosition="start"
							label={t("general")}
						/>
					)}
				</Tabs>
			</Box>
			<div style={{ marginTop: 20 }}>
				<TabPanel index={0} value={value}>
					<ViewSettings />
				</TabPanel>
				<TabPanel index={1} value={value}>
					<AlertVariantSettings
						value={alert}
						setValue={(updated) => {
							dispatch(setAlert(updated as IAlert));
						}}
					/>
				</TabPanel>
				<TabPanel index={2} value={value}>
					<TitleStyle />
				</TabPanel>
				<TabPanel index={3} value={value}>
					<MessageStyle />
				</TabPanel>
				<TabPanel index={4} value={value}>
					<GeneralSettings />
				</TabPanel>
			</div>
			<div style={{ margin: 20, display: "grid", placeContent: "center" }}>
				<AlertView
					width={400}
					height={300}
					alert={alert as IAlert}
					isShowVideoElement={true}
					backgroundColor="green"
					message={
						getTestAlertMessage({
							alert,
							userName: t("text.name"),
							text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis",
						}) as IClientMessage
					}
					base={base}
				/>
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
	);
};
export default AlertSettings;

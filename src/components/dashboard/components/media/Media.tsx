import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { showSnackBar } from "@widy/react";
import { AlertSeverity, type ISerializedAppError, MediaType } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setMediaSettings } from "../../../../../shared/slices/mediaSlice";
import getColorByMediaType from "../../../../../shared/utils/getColorByMediaType";
import {
	useGetMediaSettingsQuery,
	useUpdateMediaSettingsMutation,
} from "../../../../api/mediaApi";
import type { AppState } from "../../../../store";
import TabPanel from "../../../TabPanel";
import WidgetUrl from "../alerts/components/WidgetUrl";
import TikTokIcon from "./components/TikTokIcon";
import Tiktok from "./components/Tiktok";
import Twitch from "./components/Twitch";
import TwitchIcon from "./components/TwitchIcon";
import Youtube from "./components/Youtube";
import Kick from "./components/Kick";
import KickIcon from "./components/KickIcon";

const Media = () => {
	const [value, setValue] = useState(0);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { mediaSettings } = useSelector((state: AppState) => state.mediaState);
	const { data, error } = useGetMediaSettingsQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});
	const [updateMediaSettings] = useUpdateMediaSettingsMutation();

	useEffect(() => {
		if (data) {
			dispatch(setMediaSettings(data));
		}
	}, [dispatch, data]);

	useEffect(() => {
		if (error) {
			dispatch(
				showSnackBar({
					message: error.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	}, [dispatch, error]);

	return (
		mediaSettings && (
			<>
				<h1>{t("media.title")}</h1>
				<WidgetUrl
					widgetUrl={"http://localhost:12553/media"}
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
							indicator: {
								style: { transition: "none" },
							},
						}}
					>
						<Tab
							icon={<YouTubeIcon />}
							iconPosition="start"
							label={t("media.youtube")}
							sx={{
								"&.Mui-selected": {
									color: getColorByMediaType(MediaType.Youtube),
								},
							}}
						/>
						<Tab
							icon={<TwitchIcon />}
							iconPosition="start"
							label={t("media.twitch")}
							sx={{
								"&.Mui-selected": {
									color: getColorByMediaType(MediaType.Twitch),
								},
							}}
						/>
						<Tab
							icon={<TikTokIcon />}
							iconPosition="start"
							label={t("media.tiktok")}
							sx={{
								"&.Mui-selected": {
									color: getColorByMediaType(MediaType.TikTok),
								},
							}}
						/>
						<Tab
							icon={<KickIcon />}
							iconPosition="start"
							label={t("media.kick")}
							sx={{
								"&.Mui-selected": {
									color: getColorByMediaType(MediaType.Kick),
								},
							}}
						/>
					</Tabs>
				</Box>
				<div style={{ marginTop: 20 }}>
					<TabPanel index={0} value={value}>
						<Youtube mediaSettings={mediaSettings} />
					</TabPanel>
					<TabPanel index={1} value={value}>
						<Twitch mediaSettings={mediaSettings} />
					</TabPanel>
					<TabPanel index={2} value={value}>
						<Tiktok mediaSettings={mediaSettings} />
					</TabPanel>
					<TabPanel index={3} value={value}>
						<Kick mediaSettings={mediaSettings} />
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
					<Button
						variant="contained"
						onClick={async () => {
							try {
								await updateMediaSettings({ mediaSettings }).unwrap();
								dispatch(
									showSnackBar({
										message: t("success"),
										alertSeverity: AlertSeverity.success,
									}),
								);
							} catch (error) {
								const err = error as ISerializedAppError;
								dispatch(
									showSnackBar({
										message: err.message as string,
										alertSeverity: AlertSeverity.error,
									}),
								);
							}
						}}
					>
						{t("save")}
					</Button>
				</div>
			</>
		)
	);
};
export default Media;

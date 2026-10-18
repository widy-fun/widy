import { MenuItem, Select } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	CommandSourceType,
	ServiceType,
	TwitchSourceType,
} from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetServiceByIdQuery } from "../../../../../api/servicesApi";
import { DEFAULT_TWITCH_SOURCE } from "../../../../../constants";
import resetCommand from "../../../../../helpers/resetCommand";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import styles from "../../settings/Settings.module.css";

const TwitchSource = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [twitchSource, setTwitchSource] = useState(DEFAULT_TWITCH_SOURCE);
	const { data: twitchService } = useGetServiceByIdQuery({
		id: ServiceType.Twitch,
	});

	useEffect(() => {
		if (command.twitch_source) {
			setTwitchSource(command.twitch_source);
		}
	}, [command.twitch_source]);

	return (
		<>
			<h1>{t("twitch_source.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("twitch_source.type")}:</span>
						</div>
						<Select sx={{ width: 150 }} value={twitchSource.type}>
							{Object.values(TwitchSourceType).map((type) => (
								<MenuItem
									value={type}
									key={type}
									onClick={() => {
										setTwitchSource({
											type,
										});
									}}
								>
									{t(`twitch_source.${type}`)}
								</MenuItem>
							))}
						</Select>
					</div>

					<LeftRightButtons
						onLeft={() => {
							if (!twitchService?.authorized) {
								dispatch(
									showSnackBar({
										message: t("command.you_need_connect_first", {
											service: ServiceType.Twitch,
										}),
										alertSeverity: AlertSeverity.warning,
									}),
								);
								return;
							}
							dispatch(
								setCommand({
									twitch_source: twitchSource,
									source_type: CommandSourceType.Twitch,
									id: command.id,
									name: command.name,
									description: command.description,
									is_enabled: command.is_enabled,
								}),
							);
							navigate(-1);
						}}
						OnRight={() => {
							dispatch(setCommand(resetCommand(command)));
							navigate(-1);
						}}
						leftText={t("ok")}
						rightText={t("cancel")}
					/>
				</div>
			</div>
		</>
	);
};
export default TwitchSource;

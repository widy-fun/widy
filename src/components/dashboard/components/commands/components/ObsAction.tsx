import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import { AlertSeverity, CommandSourceType, ServiceType } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
	useGetObsSceneSourcesQuery,
	useGetObsScenesQuery,
	useGetObsSourceFiltersQuery,
} from "../../../../../api/obsApi";
import { useGetServiceByIdQuery } from "../../../../../api/servicesApi";
import { DEFAULT_OBS_ACTION } from "../../../../../constants";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import styles from "../../settings/Settings.module.css";

const ObsAction = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [obsAction, setObsAction] = useState(DEFAULT_OBS_ACTION);
	const { data: obsService } = useGetServiceByIdQuery({
		id: ServiceType.Obs,
	});
	const { data: obsScenes } = useGetObsScenesQuery();
	const { data: obsSceneSources } = useGetObsSceneSourcesQuery(
		{
			sceneUuid: obsAction.filter?.sceneUuid,
		},
		{ skip: !obsAction.filter?.sceneUuid },
	);

	const { data: obsSourceFilters } = useGetObsSourceFiltersQuery(
		{
			sourceUuid: obsAction.filter?.sourceUuid,
		},
		{
			skip: !obsAction.filter?.sourceUuid,
		},
	);

	useEffect(() => {
		if (command.obs_action) {
			setObsAction(command.obs_action);
		}
	}, [command.obs_action]);

	return (
		<>
			<h1>{t("obs_action.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("obs_action.scene")}:</span>
						</div>
						<Select
							sx={{ width: 150 }}
							value={obsAction.filter?.sceneName ?? ""}
							displayEmpty
						>
							<MenuItem value="" disabled>
								<em>{t("none")}</em>
							</MenuItem>
							{obsScenes?.responseData.scenes.map((scene) => (
								<MenuItem
									value={scene.sceneName}
									key={scene.sceneUuid}
									onClick={() => {
										setObsAction({
											...obsAction,
											filter: {
												sceneUuid: scene.sceneUuid,
												sceneName: scene.sceneName,
											},
										});
									}}
								>
									{scene.sceneName}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("obs_action.source")}:</span>
						</div>
						<Select
							sx={{ width: 150 }}
							value={obsAction.filter?.sourceName ?? ""}
							displayEmpty
						>
							<MenuItem value="" disabled>
								<em>{t("none")}</em>
							</MenuItem>
							{obsSceneSources?.responseData.sceneItems.map((sceneItem) => (
								<MenuItem
									value={sceneItem.sourceName}
									key={sceneItem.sourceUuid}
									onClick={() => {
										setObsAction({
											...obsAction,
											filter: {
												...obsAction.filter,
												sourceUuid: sceneItem.sourceUuid,
												sourceName: sceneItem.sourceName,
											},
										});
									}}
								>
									{sceneItem.sourceName}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("obs_action.source_filter")}:</span>
						</div>
						<Select
							sx={{ width: 150 }}
							value={obsAction.filter?.filterName ?? ""}
							displayEmpty
						>
							<MenuItem value="" disabled>
								<em>{t("none")}</em>
							</MenuItem>
							{obsSourceFilters?.responseData.filters.map((sourceFilter) => (
								<MenuItem
									value={sourceFilter.filterName}
									key={sourceFilter.filterName}
									onClick={() => {
										setObsAction({
											...obsAction,
											filter: {
												...obsAction.filter,
												filterName: sourceFilter.filterName,
											},
										});
									}}
								>
									{sourceFilter.filterName}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("obs_action.filter_duration")}:</span>
						</div>
						<NumericFormat
							style={{ width: 150 }}
							inputMode="numeric"
							autoComplete="off"
							allowNegative={false}
							valueIsNumericString
							decimalScale={0}
							min={0}
							isAllowed={({ floatValue }) =>
								floatValue === undefined || floatValue <= 30000000
							}
							customInput={TextField}
							slotProps={{
								input: {
									endAdornment: (
										<InputAdornment position="end">
											{t("settings.millis")}
										</InputAdornment>
									),
								},
							}}
							onChange={(e) => {
								const value = Number(e.target.value);
								setObsAction({
									...obsAction,
									filter: {
										...obsAction.filter,
										filterDuration: value,
									},
								});
							}}
							value={obsAction.filter?.filterDuration ?? 0}
						/>
					</div>
					<LeftRightButtons
						onLeft={() => {
							if (!obsService?.authorized) {
								dispatch(
									showSnackBar({
										message: t("command.you_need_connect_first", {
											service: ServiceType.Obs,
										}),
										alertSeverity: AlertSeverity.warning,
									}),
								);
								return;
							}
							if (command.source_type === CommandSourceType.None) {
								dispatch(
									showSnackBar({
										message: t("command.select_source_first"),
										alertSeverity: AlertSeverity.warning,
									}),
								);
								return;
							}
							if (command.source_type === CommandSourceType.Chat) {
								dispatch(
									setCommand({
										...command,
										obs_action: obsAction,
									}),
								);
								navigate(-1);
							} else {
								dispatch(
									showSnackBar({
										message: t("command.not_work_with_selected_source"),
										alertSeverity: AlertSeverity.warning,
									}),
								);
							}
						}}
						OnRight={() => {
							dispatch(
								setCommand({
									...command,
									telegram_bot_action: undefined,
								}),
							);
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
export default ObsAction;

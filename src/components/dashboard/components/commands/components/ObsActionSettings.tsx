import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { type IObsAction, ObsActionType } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import {
	useGetObsSceneSourcesQuery,
	useGetObsScenesQuery,
	useGetObsSourceFiltersQuery,
} from "../../../../../api/obsApi";
import styles from "../../settings/Settings.module.css";

const ObsActionSettings = ({
	obs_action,
	onObsActionChange,
}: {
	obs_action: IObsAction;
	onObsActionChange: (obsAction: IObsAction) => void;
}) => {
	const { t } = useTranslation();
	const { data: obsScenes } = useGetObsScenesQuery(undefined, {
		pollingInterval: 1000,
	});
	const { data: obsSceneSources } = useGetObsSceneSourcesQuery(
		{
			sceneUuid: obs_action.filter?.sceneUuid,
		},
		{ skip: !obs_action.filter?.sceneUuid, pollingInterval: 1000 },
	);

	const { data: obsSourceFilters } = useGetObsSourceFiltersQuery(
		{
			sourceUuid: obs_action.filter?.sourceUuid,
		},
		{
			skip: !obs_action.filter?.sourceUuid,
			pollingInterval: 1000,
		},
	);

	return (
		<>
			<div className={styles.settings}>
				<div className={styles.label}>
					<span>{t("obs_action.type")}:</span>
				</div>
				<Select sx={{ width: 150 }} value={obs_action.type}>
					{Object.values(ObsActionType).map((type) => (
						<MenuItem
							value={type}
							key={type}
							onClick={() => {
								onObsActionChange({
									type,
								});
							}}
						>
							{t(`obs_action.${type}`)}
						</MenuItem>
					))}
				</Select>
			</div>
			<div className={styles.settings}>
				<div className={styles.label}>
					<span>{t("obs_action.scene")}:</span>
				</div>
				<Select
					sx={{ width: 150 }}
					value={obs_action.filter?.sceneName ?? ""}
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
								onObsActionChange({
									...obs_action,
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
					value={obs_action.filter?.sourceName ?? ""}
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
								onObsActionChange({
									...obs_action,
									filter: {
										...obs_action.filter,
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
					value={obs_action.filter?.filterName ?? ""}
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
								onObsActionChange({
									...obs_action,
									filter: {
										...obs_action.filter,
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
						onObsActionChange({
							...obs_action,
							filter: {
								...obs_action.filter,
								filterDuration: value,
							},
						});
					}}
					value={obs_action.filter?.filterDuration ?? 0}
				/>
			</div>
		</>
	);
};
export default ObsActionSettings;

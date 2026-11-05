import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import type { IObsAction } from "@widy/sdk";
import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import {
	useGetObsSceneSourcesQuery,
	useGetObsScenesQuery,
	useGetObsSourceFiltersQuery,
} from "../../../../../api/obsApi";
import styles from "../../settings/Settings.module.css";

const ObsFilterAction = ({
	obsAction,
	setObsAction,
}: {
	obsAction: IObsAction;
	setObsAction: Dispatch<SetStateAction<IObsAction>>;
}) => {
	const { t } = useTranslation();
	const { data: obsScenes } = useGetObsScenesQuery(undefined, {
		pollingInterval: 1000,
	});
	const { data: obsSceneSources } = useGetObsSceneSourcesQuery(
		{
			sceneUuid: obsAction.filter?.sceneUuid,
		},
		{ skip: !obsAction.filter?.sceneUuid, pollingInterval: 1000 },
	);

	const { data: obsSourceFilters } = useGetObsSourceFiltersQuery(
		{
			sourceUuid: obsAction.filter?.sourceUuid,
		},
		{
			skip: !obsAction.filter?.sourceUuid,
			pollingInterval: 1000,
		},
	);

	return (
		<>
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
		</>
	);
};
export default ObsFilterAction;

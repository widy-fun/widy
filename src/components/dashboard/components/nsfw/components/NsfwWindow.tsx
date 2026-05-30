import { Button, MenuItem, Select, Typography } from "@mui/material";
import type { SerializedError } from "@reduxjs/toolkit";
import {
	AlertSeverity,
	AppEvent,
	type INsfwDetection,
	type IWindowInfo,
} from "@widy/sdk";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import useAppEvents from "../../../../../../shared/hooks/useAppEvents";
import { showSnackBar } from "../../../../../../shared/slices/snackBarSlice";
import {
	useGetWindowsQuery,
	useStartNsfwMutation,
	useStopNsfwMutation,
} from "../../../../../api/nsfwApi";
import styles from "../../settings/Settings.module.css";

const NsfwWindow = () => {
	const { t } = useTranslation();
	const { data } = useGetWindowsQuery(undefined, { pollingInterval: 1000 });
	const [windowInfo, setWindowInfo] = useState<IWindowInfo>({
		title: t("none"),
		id: -1,
		selected: false,
	});
	const [startNsfw, { isLoading }] = useStartNsfwMutation();
	const [stopNsfw] = useStopNsfwMutation();
	const dispatch = useDispatch();
	const nsfwStopped = data ? !data.some((w) => w.selected) : true;
	const eventsService = useAppEvents();
	const timestampsRef = useRef<number[]>([]);
	const [delay, setDelay] = useState<string>();

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<INsfwDetection>(
			AppEvent.NsfwDetection,
			(_) => {
				const now = performance.now();
				timestampsRef.current.push(now);
				if (timestampsRef.current.length === 3) {
					const intervals: number[] = [];
					for (let i = 1; i < timestampsRef.current.length; i++) {
						intervals.push(
							timestampsRef.current[i] - timestampsRef.current[i - 1],
						);
					}
					const avg =
						intervals.reduce((a, b) => a + b, 0) / intervals.length + 500;
					setDelay(avg.toFixed(2));
					timestampsRef.current = timestampsRef.current.slice(1);
				}
			},
		);

		return () => unsubscribe();
	}, [eventsService]);

	useEffect(() => {
		if (data) {
			const selectedWindow = data.find((w) => w.selected);
			if (selectedWindow) {
				setWindowInfo(selectedWindow);
			}
		}
	}, [data]);

	return (
		data && (
			<div style={{ display: "grid", placeItems: "center", gap: 20 }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("nsfw.window")}:</span>
						</div>
						<Select
							sx={{ width: 150 }}
							value={windowInfo?.title}
							displayEmpty
							disabled={!nsfwStopped}
						>
							<MenuItem value={t("none")} disabled>
								<em>{t("none")}</em>
							</MenuItem>
							{data.map((i) => (
								<MenuItem
									value={i.title}
									key={i.id}
									onClick={() => setWindowInfo(i)}
								>
									{i.title}
								</MenuItem>
							))}
						</Select>
					</div>
				</div>
				<div style={{ display: "flex", placeContent: "center" }}>
					{nsfwStopped ? (
						<Button
							variant="contained"
							disabled={isLoading}
							onClick={async () => {
								if (!windowInfo) return;
								try {
									await startNsfw({ windowInfo }).unwrap();
									dispatch(
										showSnackBar({
											message: t("success"),
											alertSeverity: AlertSeverity.success,
										}),
									);
								} catch (error) {
									const err = error as SerializedError;
									dispatch(
										showSnackBar({
											message: err.message as string,
											alertSeverity: AlertSeverity.error,
										}),
									);
								}
							}}
						>
							{t("start")}
						</Button>
					) : (
						<Button
							variant="contained"
							onClick={async () => {
								stopNsfw();
							}}
						>
							{t("stop")}
						</Button>
					)}
				</div>
				{delay && (
					<Typography
						sx={(theme) => ({
							color: theme.palette.primary.main,
							fontSize: 14,
						})}
					>
						{t("delay")}: {delay} {t("milliseconds")}
					</Typography>
				)}
			</div>
		)
	);
};
export default NsfwWindow;

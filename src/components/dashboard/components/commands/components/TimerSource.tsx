import { MenuItem, Select, TextField } from "@mui/material";
import { CommandSourceType, PostType } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DEFAULT_TIMER_SOURCE } from "../../../../../constants";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import styles from "../../settings/Settings.module.css";

const TimerSource = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [timerSource, setTimerSource] = useState(DEFAULT_TIMER_SOURCE);

	useEffect(() => {
		if (command.timer_source) {
			setTimerSource(command.timer_source);
		}
	}, [command.timer_source]);

	return (
		<>
			<h1>{t("timer_source.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("timer_source.message")}:</span>
						</div>
						<TextField
							value={timerSource.message}
							onChange={(e) => {
								setTimerSource({ ...timerSource, message: e.target.value });
							}}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("timer_source.post_type")}:</span>
						</div>
						<Select sx={{ width: 150 }} value={timerSource.post_type}>
							{Object.values(PostType).map((type) => (
								<MenuItem
									value={type}
									key={type}
									onClick={() => {
										setTimerSource({ ...timerSource, post_type: type });
									}}
								>
									{t(`timer_source.${type}`)}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("timer_source.mins_passed")}:</span>
						</div>
						<NumericFormat
							style={{ width: 100 }}
							inputMode="decimal"
							autoComplete="off"
							allowNegative={false}
							valueIsNumericString
							decimalScale={0}
							min={1}
							max={120}
							isAllowed={({ floatValue }) =>
								floatValue === undefined || floatValue <= 120
							}
							customInput={TextField}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (value < 1) return;
								setTimerSource({ ...timerSource, mins_passed: value });
							}}
							value={timerSource.mins_passed}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("timer_source.lines_passed")}:</span>
						</div>
						<NumericFormat
							style={{ width: 100 }}
							inputMode="decimal"
							autoComplete="off"
							allowNegative={false}
							valueIsNumericString
							decimalScale={0}
							min={1}
							max={1000}
							isAllowed={({ floatValue }) =>
								floatValue === undefined || floatValue <= 1000
							}
							customInput={TextField}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (value < 1) return;
								setTimerSource({ ...timerSource, lines_passed: value });
							}}
							value={timerSource.lines_passed}
						/>
					</div>
					<LeftRightButtons
						onLeft={() => {
							dispatch(
								setCommand({
									...command,
									timer_source: timerSource,
									chat_source: undefined,
									source_type: CommandSourceType.Timer,
								}),
							);
							navigate(-1);
						}}
						OnRight={() => {
							dispatch(
								setCommand({
									...command,
									timer_source: undefined,
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
export default TimerSource;

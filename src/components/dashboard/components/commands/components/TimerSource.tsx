import {
	Button,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { CommandSourceType, PostType } from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DEFAULT_TIMER_SOURCE } from "../../../../../constants";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import styles from "../../settings/Settings.module.css";

const TimerSource = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [timerSource, setTimerSource] = useState(DEFAULT_TIMER_SOURCE);

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
							<span>{t("timer_source.alias")}:</span>
						</div>
						<TextField
							value={timerSource.alias}
							onChange={(e) => {
								setTimerSource({ ...timerSource, alias: e.target.value });
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
							<span>{t("timer_source.interval")}:</span>
						</div>
						<NumericFormat
							style={{ width: 100 }}
							inputMode="decimal"
							autoComplete="off"
							allowNegative={false}
							valueIsNumericString
							decimalScale={0}
							min={1}
							isAllowed={({ floatValue }) =>
								floatValue === undefined || floatValue <= 3000000000
							}
							customInput={TextField}
							slotProps={{
								input: {
									inputProps: {
										step: 1,
									},
									endAdornment: (
										<InputAdornment position="end">
											{t("settings.sec")}
										</InputAdornment>
									),
								},
							}}
							onChange={(e) => {
								const value = Number(e.target.value);
								setTimerSource({ ...timerSource, interval: value });
							}}
							value={timerSource.interval}
						/>
					</div>
					<div style={{ display: "flex", placeContent: "center" }}>
						<Button
							variant="contained"
							onClick={() => {
								dispatch(
									setCommand({
										...command,
										timer: timerSource,
										chat: undefined,
										source_type: CommandSourceType.Timer,
									}),
								);
								navigate(-1);
							}}
						>
							{t("ok")}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
export default TimerSource;

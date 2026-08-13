import { Button, MenuItem, Select, TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	type IPiperTtsSettings,
	type IReward,
	Platform,
	RewardType,
	ServiceType,
} from "@widy/sdk";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetServiceByIdQuery } from "../../../../../api/servicesApi";
import getDefaultReward from "../../../../../helpers/getDefaultReward";
import getDefaultTtsSettingsByType from "../../../../../helpers/getDefaultTtsSettingsByType";
import type { AppState } from "../../../../../store";
import { setReward } from "../../../../../store/slices/rewardsSlice";
import ColorPicker from "../../../../ColorPicker";
import OnOffSwitch from "../../../../OnOffSwitch";
import TtsSettings from "../../../../TtsSettings";
import styles from "../../settings/Settings.module.css";

const RewardSettings = ({ onSave }: { onSave: () => Promise<void> }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { reward } = useSelector((state: AppState) => state.rewardsState);
	const navigate = useNavigate();
	const { data: twitch } = useGetServiceByIdQuery({ id: ServiceType.Twitch });
	const { data: kick } = useGetServiceByIdQuery({ id: ServiceType.Kick });
	const [isPending, setIsPending] = useState(false);

	const { control, handleSubmit, reset } = useForm<IReward>({
		defaultValues: reward,
	});

	useEffect(() => {
		reset(reward);
	}, [reward, reset]);

	const onSubmit = async (data: IReward) => {
		const platformAuthMap = {
			[Platform.Twitch]: twitch?.authorized,
			[Platform.Kick]: kick?.authorized,
		};

		if (!platformAuthMap[data.platform]) {
			dispatch(
				showSnackBar({
					message: t("error.not_connected"),
					alertSeverity: AlertSeverity.warning,
				}),
			);
			return;
		}
		setIsPending(true);

		dispatch(setReward(data));
		try {
			await onSave();
		} finally {
			setIsPending(false);
		}
	};

	return (
		<>
			<h3 style={{ height: 20 }}>{reward.title}</h3>
			<div
				style={{
					display: "grid",
					placeItems: "center",
				}}
			>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("reward.title")}:</span>
						</div>
						<Controller
							name="title"
							control={control}
							rules={{
								required: t("validation.required"),
								validate: (value) =>
									value.trim() !== "" || t("validation.required"),
							}}
							render={({ field, fieldState: { error } }) => (
								<TextField
									disabled={!!reward.external_id}
									slotProps={{ htmlInput: { maxLength: 45 } }}
									{...field}
									onChange={(e) => {
										field.onChange(e);
										dispatch(setReward({ ...reward, title: e.target.value }));
									}}
									error={!!error}
									helperText={error?.message}
								/>
							)}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("reward.platform")}:</span>
						</div>
						<Select
							disabled={!!reward.external_id}
							sx={{ width: 150 }}
							value={reward.platform}
						>
							{Object.values(Platform).map((platform) => (
								<MenuItem
									value={platform}
									key={platform}
									onClick={() => {
										dispatch(
											setReward({
												...reward,
												platform,
											}),
										);
									}}
								>
									{platform}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("reward.type")}:</span>
						</div>
						<Select
							disabled={!!reward.external_id}
							sx={{ width: 150 }}
							value={reward.type}
						>
							{Object.values(RewardType).map((type) => (
								<MenuItem
									value={type}
									key={type}
									onClick={() => {
										dispatch(
											setReward({
												...reward,
												type,
												is_user_input_required: type !== RewardType.Alert,
											}),
										);
									}}
								>
									{type}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("reward.description")}:</span>
						</div>
						<TextField
							disabled={!!reward.external_id}
							multiline
							minRows={2}
							maxRows={4}
							slotProps={{ htmlInput: { maxLength: 200 } }}
							value={reward.description}
							onChange={(e) => {
								dispatch(setReward({ ...reward, description: e.target.value }));
							}}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("reward.cost")}:</span>
						</div>
						<Controller
							name="cost"
							control={control}
							rules={{
								required: t("validation.required"),
								validate: (value) =>
									(value !== undefined && value !== null && value !== 0) ||
									t("validation.required"),
							}}
							render={({ field, fieldState: { error } }) => (
								<NumericFormat
									disabled={!!reward.external_id}
									style={{ width: 100 }}
									inputMode="decimal"
									autoComplete="off"
									allowNegative={false}
									valueIsNumericString
									decimalScale={0}
									min={1}
									customInput={TextField}
									isAllowed={({ floatValue }) =>
										floatValue === undefined || floatValue !== 0
									}
									value={field.value}
									onValueChange={(e) => {
										const newCost = e.floatValue ?? 1;
										field.onChange(newCost);
										dispatch(setReward({ ...reward, cost: newCost }));
									}}
									error={!!error}
									helperText={error?.message}
								/>
							)}
						/>
					</div>
					{reward.type === RewardType.Auction && (
						<div className={styles.settings}>
							<div className={styles.label}>
								<span>{t("reward.points_currency_ratio")}:</span>
							</div>
							<NumericFormat
								style={{ width: 100 }}
								inputMode="decimal"
								autoComplete="off"
								allowNegative={false}
								valueIsNumericString
								customInput={TextField}
								onValueChange={(e) => {
									dispatch(
										setReward({
											...reward,
											points_currency_ratio: e.floatValue ?? 0,
										}),
									);
								}}
								value={reward.points_currency_ratio}
							/>
						</div>
					)}
					{reward.type === RewardType.TTS && (
						<TtsSettings
							tts_type={reward.tts_action.tts_type}
							onTtsTypeChange={(tts_type) => {
								dispatch(
									setReward({
										...reward,
										tts_action: {
											tts_type,
											tts_settings: getDefaultTtsSettingsByType(tts_type),
											tts_volume: reward.tts_action.tts_volume,
										},
									}),
								);
							}}
							tts_volume={reward.tts_action.tts_volume}
							onTtsVolumeChange={(tts_volume) => {
								dispatch(
									setReward({
										...reward,
										tts_action: { ...reward.tts_action, tts_volume },
									}),
								);
							}}
							voices={
								reward.tts_action.tts_settings
									? (reward.tts_action.tts_settings as IPiperTtsSettings).voices
									: {}
							}
							onVoicesChange={(voices) => {
								dispatch(
									setReward({
										...reward,
										tts_action: {
											...reward.tts_action,
											tts_settings: { voices },
										},
									}),
								);
							}}
						/>
					)}
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("reward.background_color")}:</span>
						</div>
						<ColorPicker
							initialColor={reward.background_color}
							onChange={({ hex }) => {
								dispatch(
									setReward({
										...reward,
										background_color: reward.external_id
											? getDefaultReward().background_color
											: hex,
									}),
								);
							}}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("reward.is_global_cooldown_enabled")}:</span>
						</div>
						<OnOffSwitch
							disabled={!!reward.external_id}
							checked={!!reward.is_global_cooldown_enabled}
							onChange={() =>
								dispatch(
									setReward({
										...reward,
										is_global_cooldown_enabled:
											!reward.is_global_cooldown_enabled,
									}),
								)
							}
						/>
					</div>
					{!!reward.is_global_cooldown_enabled && (
						<div className={styles.settings}>
							<div className={styles.label}>
								<span>{t("reward.global_cooldown_seconds")}:</span>
							</div>
							<NumericFormat
								disabled={!!reward.external_id}
								style={{ width: 100 }}
								inputMode="decimal"
								autoComplete="off"
								allowNegative={false}
								valueIsNumericString
								decimalScale={0}
								min={0}
								customInput={TextField}
								value={reward.global_cooldown_seconds}
								onValueChange={(e) => {
									dispatch(
										setReward({
											...reward,
											global_cooldown_seconds: e.floatValue,
										}),
									);
								}}
							/>
						</div>
					)}
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
						onClick={handleSubmit(onSubmit)}
						disabled={isPending}
					>
						{reward.type === RewardType.Alert ? t("next") : t("save")}
					</Button>
					<Button onClick={() => navigate(-1)}>{t("back")}</Button>
				</div>
			</div>
		</>
	);
};
export default RewardSettings;

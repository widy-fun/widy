import { TextField } from "@mui/material";
import { showSnackBar } from "@widy/react";
import { AlertSeverity, CommandSourceType } from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { DEFAULT_AUCTION_ACTION } from "../../../../../constants";
import type { AppState } from "../../../../../store";
import { setCommand } from "../../../../../store/slices/commandsSlice";
import LeftRightButtons from "../../../../LeftRightButtons";
import styles from "../../settings/Settings.module.css";

const AuctionAction = () => {
	const { t } = useTranslation();
	const { command } = useSelector((state: AppState) => state.commandsState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [auctionAction, setAuctionAction] = useState(DEFAULT_AUCTION_ACTION);

	useEffect(() => {
		if (command.auction_action) {
			setAuctionAction(command.auction_action);
		}
	}, [command.auction_action]);

	return (
		<>
			<h1>{t("auction_action.title")}</h1>
			<div style={{ display: "grid", placeItems: "center" }}>
				<div className={styles.settingsContainer}>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("auction_action.regular_luck_modifier")}:</span>
						</div>
						<NumericFormat
							style={{ width: 100 }}
							inputMode="decimal"
							autoComplete="off"
							allowNegative={false}
							valueIsNumericString
							min={1}
							max={10}
							isAllowed={({ floatValue }) =>
								floatValue === undefined || floatValue <= 10
							}
							customInput={TextField}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (value < 1) return;
								setAuctionAction({
									...auctionAction,
									regular_luck_modifier: value,
								});
							}}
							value={auctionAction.regular_luck_modifier}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("auction_action.subscriber_luck_modifier")}:</span>
						</div>
						<NumericFormat
							style={{ width: 100 }}
							inputMode="decimal"
							autoComplete="off"
							allowNegative={false}
							valueIsNumericString
							min={1}
							max={10}
							isAllowed={({ floatValue }) =>
								floatValue === undefined || floatValue <= 10
							}
							customInput={TextField}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (value < 1) return;
								setAuctionAction({
									...auctionAction,
									subscriber_luck_modifier: value,
								});
							}}
							value={auctionAction.subscriber_luck_modifier}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("auction_action.vip_luck_modifier")}:</span>
						</div>
						<NumericFormat
							style={{ width: 100 }}
							inputMode="decimal"
							autoComplete="off"
							allowNegative={false}
							valueIsNumericString
							min={1}
							max={10}
							isAllowed={({ floatValue }) =>
								floatValue === undefined || floatValue <= 10
							}
							customInput={TextField}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (value < 1) return;
								setAuctionAction({
									...auctionAction,
									vip_luck_modifier: value,
								});
							}}
							value={auctionAction.vip_luck_modifier}
						/>
					</div>
					<div className={styles.settings}>
						<div className={styles.label}>
							<span>{t("auction_action.moderator_luck_modifier")}:</span>
						</div>
						<NumericFormat
							style={{ width: 100 }}
							inputMode="decimal"
							autoComplete="off"
							allowNegative={false}
							valueIsNumericString
							min={1}
							max={10}
							isAllowed={({ floatValue }) =>
								floatValue === undefined || floatValue <= 10
							}
							customInput={TextField}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (value < 1) return;
								setAuctionAction({
									...auctionAction,
									moderator_luck_modifier: value,
								});
							}}
							value={auctionAction.moderator_luck_modifier}
						/>
					</div>

					<LeftRightButtons
						onLeft={() => {
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
										auction_action: auctionAction,
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
									auction_action: undefined,
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
export default AuctionAction;

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { LotVariant } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../../../../../store";
import { setLotVariant } from "../../../../../store/slices/lotsSlice";

const LotsVariant = () => {
	const { t } = useTranslation();
	const { variant } = useSelector((state: AppState) => state.lotsState);
	const dispatch = useDispatch();

	return (
		<ToggleButtonGroup
			color="primary"
			value={variant}
			exclusive
			onChange={(_, value: LotVariant | null) => {
				if (value) {
					dispatch(setLotVariant(value));
				}
			}}
		>
			<ToggleButton sx={{ width: "100%" }} value={LotVariant.Donation}>
				<Tooltip title={t("lot.donation")}>
					<AttachMoneyIcon />
				</Tooltip>
			</ToggleButton>
			<ToggleButton
				sx={{ width: "100%" }}
				value={LotVariant.ChannelSubscription}
			>
				<Tooltip title={t("lot.channel_subscription")}>
					<CurrencyExchangeIcon />
				</Tooltip>
			</ToggleButton>
			<ToggleButton
				sx={{ width: "100%" }}
				value={LotVariant.CommandAuctionAction}
			>
				<Tooltip title={t("lot.command")}>
					<PriorityHighIcon />
				</Tooltip>
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
export default LotsVariant;

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import {
	Button,
	ButtonGroup,
	Card,
	CardContent,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from "@mui/material";
import { showSnackBar } from "@widy/react";
import type { IAuctionEvent, ILot } from "@widy/sdk";
import { AlertSeverity } from "@widy/sdk";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { findBestMatch } from "string-similarity";
import getRandomColor from "../../../../../helpers/getRandomColor.ts";
import type { AppState } from "../../../../../store/index.ts";
import { auctionEventsSlice } from "../../../../../store/slices/auctionEventsSlice.ts";
import { addLot, updateLot } from "../../../../../store/slices/lotsSlice.ts";

const AuctionEventCard = ({ event }: { event: IAuctionEvent }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { removeAuctionEvent } = auctionEventsSlice.actions;
	const { lots, currentId, variant } = useSelector(
		(state: AppState) => state.lotsState,
	);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { colors } = useSelector((state: AppState) => state.mainState);
	const { services } = useSelector((state: AppState) => state.servicesState);

	const bestMatch = useMemo(() => {
		if (!event.text) return;
		const lotsNames = lots[variant].map(({ name }) => name || "");
		if (!lotsNames.length) return;
		const {
			bestMatch: { rating },
			bestMatchIndex,
		} = findBestMatch(event.text, lotsNames);
		return rating > 0.4
			? { ...lots[variant][bestMatchIndex], index: bestMatchIndex + 1 }
			: null;
	}, [lots, event.text, variant]);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddToRandomLot = useCallback(() => {
		const randomLotIndex = Math.floor(
			Math.random() * (lots[variant].length + 1),
		);
		const randomLot = lots[variant].at(randomLotIndex) as ILot;
		dispatch(
			updateLot({
				...randomLot,
				amount: (randomLot.amount ?? 0) + event.exchanged_amount,
			}),
		);
		dispatch(
			showSnackBar({
				message: `+${event.exchanged_amount.toFixed(2)}      #${randomLot.fastId}`,
				alertSeverity: AlertSeverity.success,
			}),
		);
		dispatch(removeAuctionEvent({ event, variant }));
		setAnchorEl(null);
	}, [dispatch, lots, event, removeAuctionEvent, variant]);

	const handleAddToBestMatch = useCallback(() => {
		if (!bestMatch) return;
		dispatch(
			updateLot({
				...bestMatch,
				amount: (bestMatch.amount ?? 0) + event.exchanged_amount,
			}),
		);
		dispatch(
			showSnackBar({
				message: `+${event.exchanged_amount.toFixed(2)}      #${bestMatch.fastId}`,
				alertSeverity: AlertSeverity.success,
			}),
		);
		dispatch(removeAuctionEvent({ event, variant }));
		setAnchorEl(null);
	}, [dispatch, bestMatch, removeAuctionEvent, event, variant]);

	return (
		<Card
			sx={{
				width: 304,
				marginBottom: "10px",
				cursor: "pointer",
				backgroundColor: services[event.service].color,
			}}
		>
			<CardContent>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h6">
						{event.amount}
						{event.currency} {event.user_name}
					</Typography>
					<IconButton
						onClick={() => {
							dispatch(removeAuctionEvent({ event, variant }));
						}}
						title={t("bid.delete")}
						size="large"
					>
						<CloseIcon />
					</IconButton>
				</div>
				<Typography sx={{ wordWrap: "break-word" }}>{event.text}</Typography>
				<div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
					<ButtonGroup size="small" style={{ display: "flex" }}>
						<Button
							style={{ width: "100%" }}
							variant="outlined"
							size="small"
							onClick={() => {
								dispatch(
									addLot({
										fastId: currentId,
										name: event.text ?? "",
										amount: event.exchanged_amount,
										color: getRandomColor(colors),
									}),
								);
								dispatch(removeAuctionEvent({ event, variant }));
							}}
						>
							{t("bid.new")}
						</Button>
						<Button
							variant="outlined"
							size="small"
							onClick={(e) => handleClick(e)}
						>
							<ArrowDropDownIcon />
						</Button>
					</ButtonGroup>
					<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
						<MenuItem onClick={handleAddToRandomLot}>
							{t("bid.add_to_random_slot")}
						</MenuItem>
					</Menu>
					{bestMatch && (
						<Button
							variant="outlined"
							size="small"
							onClick={handleAddToBestMatch}
							sx={{ wordBreak: "break-all" }}
						>
							{bestMatch.name}
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
export default AuctionEventCard;

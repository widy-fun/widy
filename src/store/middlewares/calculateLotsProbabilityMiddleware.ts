import type { Middleware, UnknownAction } from "@reduxjs/toolkit";
import calculateLotProbability from "../../helpers/calculateLotProbability";
import findLotsMinMaxAmount from "../../helpers/findLotsMinMaxAmount";
import lotsTotalAmount from "../../helpers/lotsTotalAmount";
import type { AppState } from "..";
import { lotsSlice, setLots } from "../slices/lotsSlice";

const calculateLotsProbabilityMiddleware: Middleware<unknown, AppState> =
	(store) => (next) => (action) => {
		const appAction = action as UnknownAction;

		const result = next(action);

		const nextState = store.getState();

		if (
			appAction.type === lotsSlice.actions.removeLot.type ||
			appAction.type === lotsSlice.actions.updateLot.type ||
			appAction.type === lotsSlice.actions.addLot.type
		) {
			const lots = nextState.lotsState.lots;

			const totalAmount = lotsTotalAmount(lots);

			const { max, min } = findLotsMinMaxAmount(lots);

			store.dispatch(
				setLots(
					lots
						.map((lot) => {
							return {
								...lot,
								...calculateLotProbability({
									amount: lot.amount,
									totalAmount,
									maxAmount: max?.amount,
									minAmount: min?.amount,
									lotsLen: lots.length,
								}),
							};
						})
						.sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0)),
				),
			);
		}

		return result;
	};

export default calculateLotsProbabilityMiddleware;

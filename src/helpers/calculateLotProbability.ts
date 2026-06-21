const calculateLotProbability = ({
	amount,
	totalAmount,
	maxAmount,
	minAmount,
	lotsLen,
}: {
	amount: number | undefined;
	totalAmount: number;
	maxAmount: number | undefined;
	minAmount: number | undefined;
	lotsLen: number;
}) => {
	const winProbability = !totalAmount ? 0 : (amount ?? 0) / totalAmount;
	const dropoutOptionAmount = (maxAmount ?? 0) / (!amount ? 1 : amount);
	const maxDropoutAmount =
		(maxAmount ?? 0) / (!minAmount || minAmount === 0 ? 1 : minAmount);
	const dropoutRatio = 1 / maxDropoutAmount;
	const winChance = winProbability * 100;
	const winChancePercent = winChance.toFixed(1);
	const normalOptionSize = Math.round(winChance);
	const dropoutOptionSize = Math.round(
		dropoutRatio * dropoutOptionAmount * 100,
	);
	const dropoutAmount = (1 - (amount ?? 0) / totalAmount) / (lotsLen - 1);

	return {
		dropoutAmount,
		winChancePercent,
		normalOptionSize,
		dropoutOptionSize,
	};
};
export default calculateLotProbability;

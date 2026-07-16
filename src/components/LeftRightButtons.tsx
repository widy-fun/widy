import { Button } from "@mui/material";

const LeftRightButtons = ({
	onLeft,
	OnRight,
	leftText,
	rightText,
}: {
	onLeft: () => void;
	OnRight: () => void;
	leftText: string;
	rightText: string;
}) => {
	return (
		<div
			style={{
				display: "flex",
				gap: 20,
				justifyContent: "center",
				marginTop: 20,
			}}
		>
			<Button variant="contained" onClick={onLeft}>
				{leftText}
			</Button>
			<Button onClick={OnRight}>{rightText}</Button>
		</div>
	);
};
export default LeftRightButtons;

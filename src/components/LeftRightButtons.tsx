import { Button } from "@mui/material";

const LeftRightButtons = ({
	onLeft,
	OnRight,
	leftText,
	rightText,
	disabled,
}: {
	onLeft: () => void;
	OnRight: () => void;
	leftText: string;
	rightText: string;
	disabled?: boolean;
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
			<Button disabled={disabled} variant="contained" onClick={onLeft}>
				{leftText}
			</Button>
			<Button disabled={disabled} onClick={OnRight}>
				{rightText}
			</Button>
		</div>
	);
};
export default LeftRightButtons;

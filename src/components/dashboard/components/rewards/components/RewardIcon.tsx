const RewardIcon = ({ size = 20 }: { size?: number }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 680 680"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
		>
			<title>Purple ring icon with quarter progress segment</title>
			<circle
				cx="340"
				cy="340"
				r="300"
				fill="none"
				stroke="currentColor"
				strokeWidth="80"
			/>
			<path
				d="M 340 180 A 160 160 0 0 1 500 340 L 420 340 A 80 80 0 0 0 340 260 Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export default RewardIcon;

import { Card } from "@mui/material";
import { useNavigate } from "react-router";

const CommandSourceCard = ({
	path,
	description,
	title,
	isActive,
}: {
	path: string;
	title: string;
	description: string;
	isActive: boolean;
}) => {
	const navigate = useNavigate();

	return (
		<Card
			sx={{
				width: 200,
				height: 200,
				position: "relative",
				wordBreak: "break-all",
				textAlign: "center",
				cursor: "pointer",
				border: isActive ? "1px solid red" : undefined,
			}}
			onClick={() => {
				navigate(`/dashboard/${path}`);
			}}
		>
			{title}
			{description}
		</Card>
	);
};
export default CommandSourceCard;

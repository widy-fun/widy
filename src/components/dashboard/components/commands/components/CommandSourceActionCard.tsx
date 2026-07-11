import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Card } from "@mui/material";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

const CommandSourceActionCard = ({
	path,
	description,
	title,
	selected,
	icon,
	onNavigate,
}: {
	path: string;
	title: string;
	description: string;
	selected: boolean;
	icon: ReactNode;
	onNavigate?: () => void;
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
				padding: 2,
			}}
			onClick={() => {
				if (onNavigate) {
					onNavigate();
				}
				navigate(path);
			}}
		>
			{selected && (
				<CheckCircleIcon
					sx={{ color: "green", position: "absolute", top: 5, right: 5 }}
				/>
			)}
			<div>{icon}</div>
			<div>
				<div style={{ fontWeight: "bold" }}>{title}</div>
				<div style={{ fontSize: 14 }}>{description}</div>
			</div>
		</Card>
	);
};
export default CommandSourceActionCard;

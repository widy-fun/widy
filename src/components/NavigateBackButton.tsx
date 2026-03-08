import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";

const NavigateBackButton = () => {
	const navigate = useNavigate();

	return (
		<div style={{ position: "absolute", top: 10, left: 10 }}>
			<IconButton
				onClick={() => {
					navigate(-1);
				}}
			>
				<ArrowBackIosIcon />
			</IconButton>
		</div>
	);
};
export default NavigateBackButton;

import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import {
	AlertVariant,
	AlertVariationConditions,
	MessageType,
	ViewType,
} from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setAlert } from "../../../../../../shared/slices/alertsSlice";
import { TEXT_STYLE } from "../../../../../constants";

const AddNewAlertVariantButton = ({ group_id }: { group_id: string }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<Button
			sx={{ minHeight: "5.3rem" }}
			startIcon={<AddIcon />}
			onClick={() => {
				dispatch(
					setAlert({
						id: crypto.randomUUID(),
						audio_volume: 50,
						view_type: ViewType.Top,
						audio: "alert.mp3",
						video: "video.mp4",
						image: "image.gif",
						group_id,
						name: t("alert.new_variant"),
						title_style: TEXT_STYLE,
						message_style: TEXT_STYLE,
						variation_conditions: AlertVariationConditions.Random,
						status: true,
						type: MessageType.Donation,
						amount: 100,
						video_volume: 50,
						delay: 0,
						duration: 3000,
						alert_variant: AlertVariant.ImageAndAudio,
					}),
				);
				navigate("/dashboard/alerts/new/alert");
			}}
		>
			{t("alert.add_new_variant")}
		</Button>
	);
};
export default AddNewAlertVariantButton;

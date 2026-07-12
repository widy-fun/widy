import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setAlert } from "../../../../../../shared/slices/alertsSlice";
import getDefaultAlert from "../../../../../helpers/getDefaultAlert";

const AddNewAlertVariantButton = ({ group_id }: { group_id: string }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<Button
			sx={{ minHeight: "5.3rem" }}
			startIcon={<AddIcon />}
			onClick={() => {
				dispatch(setAlert(getDefaultAlert(group_id)));
				navigate("/dashboard/alerts/new/alert");
			}}
		>
			{t("alert.add_new_variant")}
		</Button>
	);
};
export default AddNewAlertVariantButton;

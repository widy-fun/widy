import DataObjectIcon from "@mui/icons-material/DataObject";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

const VariablesAdornment = () => {
	const { t } = useTranslation();

	return (
		<Tooltip title={t("can_use_variables")}>
			<DataObjectIcon />
		</Tooltip>
	);
};
export default VariablesAdornment;

import DataObjectIcon from "@mui/icons-material/DataObject";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

const VariablesAdornment = ({ variables = [] }: { variables?: string[] }) => {
	const { t } = useTranslation();
	const title = `${t("can_use_variables")} ${variables.join(" ")}`;

	return (
		<Tooltip title={title}>
			<DataObjectIcon />
		</Tooltip>
	);
};
export default VariablesAdornment;

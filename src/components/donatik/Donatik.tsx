import { ServiceType } from "../../../shared/enums";
import AuthorizationWithStreamElements from "../AuthorizationWithStreamElements";

const Donatik = () => {
	return (
		<AuthorizationWithStreamElements
			service={ServiceType.Donatik}
			url="https://admin.donatik.ua/settings/integrations"
		/>
	);
};
export default Donatik;

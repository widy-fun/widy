import { ServiceType } from "../../../shared/enums";
import AuthorizationWithStreamElements from "../AuthorizationWithStreamElements";

const Donatello = () => {
	return (
		<AuthorizationWithStreamElements
			service={ServiceType.Donatello}
			url="https://donatello.to/panel/settings?tab=integrations"
		/>
	);
};
export default Donatello;

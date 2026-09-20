import { Route, Routes } from "react-router";
import AuthorizationView from "../AuthorizationView";
import ApiKey from "./components/ApiKey";

const OpenAI = () => {
	return (
		<AuthorizationView>
			<Routes>
				<Route path="api-key" element={<ApiKey />} />
			</Routes>
		</AuthorizationView>
	);
};
export default OpenAI;

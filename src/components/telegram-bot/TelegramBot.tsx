import { Route, Routes } from "react-router";
import AuthorizationView from "../AuthorizationView";
import Token from "./components/Token";

const TelegramBot = () => {
	return (
		<AuthorizationView>
			<Routes>
				<Route path="token" element={<Token />} />
			</Routes>
		</AuthorizationView>
	);
};
export default TelegramBot;

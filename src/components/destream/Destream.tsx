import { Route, Routes } from "react-router";
import AuthorizationView from "../AuthorizationView";
import OverlayId from "./components/OverlayId";

const Destream = () => {
	return (
		<AuthorizationView>
			<Routes>
				<Route path="overlay-id" element={<OverlayId />} />
			</Routes>
		</AuthorizationView>
	);
};
export default Destream;

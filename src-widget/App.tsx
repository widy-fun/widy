import { ThemeProvider, Typography } from "@mui/material";
import { dark } from "@widy/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router";
import Widget from "../shared/components/Widget";
import useAppEvents from "../shared/hooks/useAppEvents";
import Alert from "./components/alert/Alert";
import Goal from "./components/goal/Goal";
import Media from "./components/media/Media";
import Nsfw from "./components/nsfw/Nsfw";
import ObsDockMessages from "./components/obs-dock-messages/ObsDockMessages";
import Tts from "./components/tts/Tts";

const App = () => {
	const eventsService = useAppEvents();
	const [isConnected, setIsConnected] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		eventsService.addStatusListener(setIsConnected);
		return () => eventsService.removeStatusListener(setIsConnected);
	}, [eventsService]);

	return (
		<>
			{!isConnected && (
				<div
					style={{
						position: "absolute",
						top: 0,
						right: 0,
						color: "red",
						zIndex: 2,
					}}
				>
					<Typography
						sx={{
							fontSize: "5vw",
							fontWeight: "bold",
						}}
					>
						{t("disconnected")}
					</Typography>
				</div>
			)}
			<Routes>
				<Route path="/alert" element={<Alert />} />
				<Route path="/tts" element={<Tts />} />
				<Route path="/media" element={<Media />} />
				<Route path="/goal" element={<Goal />} />
				<Route path="/nsfw" element={<Nsfw />} />
				<Route path="/widget/:id" element={<Widget type="view" />} />
				<Route
					path="/obs-dock-messages"
					element={
						<ThemeProvider theme={dark}>
							<ObsDockMessages />
						</ThemeProvider>
					}
				/>
			</Routes>
		</>
	);
};
export default App;

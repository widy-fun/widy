import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { openUrl } from "@tauri-apps/plugin-opener";
import { useTranslation } from "react-i18next";

const Info = () => {
	const { t } = useTranslation();

	return (
		<>
			<h1>{t("dashboard.info")}</h1>
			<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
				<Card sx={{ maxWidth: 600, width: "100%" }}>
					<CardContent sx={{ textAlign: "center", p: 4 }}>
						<img
							src="/logo.png"
							alt="Widy Logo"
							style={{ width: 120, height: 120, marginBottom: 16 }}
						/>
						<Typography variant="h5" component="h2" gutterBottom>
							Widy
						</Typography>
						<Typography variant="body1" color="text.secondary" gutterBottom>
							{t("version")}: 0.2.4
						</Typography>
						<Box sx={{ mt: 2 }}>
							<Button
								variant="outlined"
								onClick={() => openUrl("https://widy.fun")}
								sx={{ mr: 1 }}
							>
								Visit Widy.fun
							</Button>
							<Button
								variant="outlined"
								onClick={() => openUrl("https://github.com/ik1s3v/widy")}
							>
								GitHub Repository
							</Button>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</>
	);
};

export default Info;

import WarningIcon from "@mui/icons-material/Warning";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { type IModerator, TokenType } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDeleteModeratorByIdMutation } from "../../../../../api/moderatorsApi";
import { useGetTokenByTypeQuery } from "../../../../../api/tokensApi";
import ConfigurationMenu from "../../../../ConfigurationMenu";
import TokenLink from "../../../../TokenLink";

const ModeratorCard = ({ moderator }: { moderator: IModerator }) => {
	const { t } = useTranslation();
	const [deleteModeratorById] = useDeleteModeratorByIdMutation();
	const protocol = import.meta.env.DEV ? "http" : "https";
	const { data: moderatorToken } = useGetTokenByTypeQuery({
		type: TokenType.Moderation,
	});
	const url = `${protocol}://${import.meta.env.VITE_WIDY_BASE_DOMAINE}/moderation/add-user?token=${moderatorToken?.token}&moderatorId=${moderator.id}`;

	return (
		<>
			{moderatorToken && (
				<Card
					sx={{
						marginBottom: 1,
						position: "relative",
						width: "100%",
						minHeight: 100,
					}}
				>
					<CardContent>
						<Typography variant="h5" component="div" sx={{ marginBottom: 1 }}>
							{moderator.name}
						</Typography>
						<TokenLink url={url} token={moderatorToken} />
						<Box
							sx={(theme) => ({
								marginTop: 1,
								color: theme.palette.warning.main,
								fontSize: 12,
							})}
						>
							<Box
								sx={{
									display: "flex",
									gap: 0.5,
								}}
							>
								<WarningIcon sx={{ fontSize: 12 }} />
								<span>{t("moderators.give_link")}</span>
							</Box>
							<Box
								sx={{
									display: "flex",
									gap: 0.5,
								}}
							>
								<WarningIcon sx={{ fontSize: 12 }} />
								<span>{t("moderators.p2p")}</span>
							</Box>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "end",
								position: "absolute",
								top: 0,
								right: 0,
							}}
						>
							<ConfigurationMenu
								onConfirm={async () => {
									await deleteModeratorById({ id: moderator.id }).unwrap();
								}}
								warning={t("sure_delete")}
								configurePath={`/dashboard/moderators/${moderator.id}`}
								logsPath={`/dashboard/moderators/logs/${moderator.id}`}
								isShowTest={false}
								isShowLogs={true}
							/>
						</Box>
					</CardContent>
				</Card>
			)}
		</>
	);
};
export default ModeratorCard;

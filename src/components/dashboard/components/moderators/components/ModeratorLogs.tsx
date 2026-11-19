import { Box, Card, CardContent, Typography } from "@mui/material";
import { MessageDate } from "@widy/react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router";
import { useGetModeratorLogsInfiniteQuery } from "../../../../../api/moderatorsLogsApi";

const ModeratorLogs = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useGetModeratorLogsInfiniteQuery(
			{
				id,
			},
			{
				skip: !id,
			},
		);

	return (
		<Box sx={{ display: "grid", gap: 1 }}>
			<h1>{t("logs")}</h1>
			<InfiniteScroll
				loadMore={() => fetchNextPage()}
				hasMore={!isFetchingNextPage && hasNextPage}
				initialLoad={false}
				useWindow={true}
				threshold={200}
				loader={<div key="loader">{t("loading")}</div>}
			>
				<div>
					{data?.pages.map((page) =>
						page.map((log) => (
							<Card key={log.id} sx={{ marginBottom: 1 }}>
								<CardContent
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										gap: 2,
										"&:last-child": { pb: 2 },
									}}
								>
									<Typography>{t(`events.${log.event_type}`)}</Typography>
									<MessageDate createdAt={log.created_at} />
								</CardContent>
							</Card>
						)),
					)}
				</div>
			</InfiniteScroll>
		</Box>
	);
};
export default ModeratorLogs;

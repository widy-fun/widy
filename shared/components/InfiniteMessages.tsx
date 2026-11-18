import { Skeleton } from "@mui/material";
import type { TypedUseInfiniteQuery } from "@reduxjs/toolkit/query/react";
import {
	MediaTile,
	MessageCard,
	MessageEndAdornment,
	MessageStartAdornment,
	MessagesFilter,
	MessageText,
	MessageTitle,
	setPlayingAlertId,
	setPlayingMediaId,
	setPlayingTtsId,
	showSnackBar,
} from "@widy/react";
import type { IClientMessage, IMessagesFilter } from "@widy/sdk";
import { AlertSeverity, AppEvent } from "@widy/sdk";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../../src/store";
import useAppEvents from "../hooks/useAppEvents";

const InfiniteMessages = ({
	useGetMessagesInfiniteQuery,
}: {
	useGetMessagesInfiniteQuery: TypedUseInfiniteQuery<
		IClientMessage[],
		{ filter: IMessagesFilter },
		any,
		any
	>;
}) => {
	const { t } = useTranslation();
	const { playingAlertId, filter } = useSelector(
		(state: AppState) => state.messagesState,
	);
	const eventsService = useAppEvents();
	const { playingTtsId, playingMediaId, pausedMediaId } = useSelector(
		(state: AppState) => state.messagesState,
	);
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
		useGetMessagesInfiniteQuery(
			{
				filter,
			},
			{
				refetchOnFocus: false,
				refetchOnMountOrArgChange: false,
				refetchOnReconnect: false,
			},
		);
	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			dispatch(
				showSnackBar({
					message: error.message as string,
					alertSeverity: AlertSeverity.error,
				}),
			);
		}
	}, [error, dispatch]);

	return (
		<>
			<MessagesFilter filter={filter} t={t} />
			{!data?.pages[0].length ? (
				<Skeleton
					variant="rectangular"
					sx={{
						display: "flex",
						borderRadius: 3,
						boxSizing: "border-box",
						marginBottom: "1rem",
						minHeight: "5.3rem",
						overflow: "hidden",
					}}
				/>
			) : (
				<InfiniteScroll
					loadMore={() => fetchNextPage()}
					hasMore={!isFetchingNextPage && hasNextPage}
					initialLoad={false}
					useWindow={true}
					threshold={50}
					loader={<div key="loader">{t("loading")}</div>}
				>
					<div>
						{data.pages.map((page) =>
							page.map((message) => (
								<MessageCard
									key={message.id}
									message={message}
									isAlertPlaying={message.id === playingAlertId}
									isTtsPlaying={message.id === playingTtsId}
									onReplayAlert={() => {
										eventsService.send({
											event: AppEvent.ReplayAlert,
											data: message,
										});
									}}
									onSkipAlert={() => {
										dispatch(setPlayingAlertId(""));
										eventsService.send({
											event: AppEvent.SkipAlert,
											data: message.id,
										});
									}}
									title={<MessageTitle message={message} t={t} />}
									text={<MessageText message={message} t={t} />}
									startAdornment={
										<MessageStartAdornment
											message={message}
											isMediaPlaying={message.id === playingMediaId}
											isAlertPlaying={message.id === playingAlertId}
											onReplayMedia={() => {
												eventsService.send({
													event: AppEvent.ReplayMedia,
													data: message,
												});
											}}
										/>
									}
									endAdornment={<MessageEndAdornment message={message} />}
									messageMedia={
										<MediaTile
											message={message}
											pausedMediaId={pausedMediaId}
											onPlayMedia={() => {
												eventsService.send({
													event: AppEvent.PlayMedia,
													data: message.id,
												});
											}}
											onPauseMedia={() => {
												eventsService.send({
													event: AppEvent.PauseMedia,
													data: message.id,
												});
											}}
											onSkipMedia={() => {
												dispatch(setPlayingMediaId(""));
												eventsService.send({
													event: AppEvent.SkipMedia,
													data: message.id,
												});
											}}
											isMediaPlaying={message.id === playingMediaId}
										/>
									}
									onReplayTts={() => {
										eventsService.send({
											event: AppEvent.ReplayTts,
											data: message,
										});
									}}
									onSkipTts={() => {
										dispatch(setPlayingTtsId(""));
										eventsService.send({
											event: AppEvent.SkipTts,
											data: message.id,
										});
									}}
									t={t}
								/>
							)),
						)}
					</div>
				</InfiniteScroll>
			)}
		</>
	);
};
export default InfiniteMessages;

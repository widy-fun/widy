import { relaunch } from "@tauri-apps/plugin-process";
import {
	check,
	type DownloadEvent,
	type Update,
} from "@tauri-apps/plugin-updater";
import { useCallback, useEffect, useState } from "react";

export type DownloadProgress = {
	downloadedBytes: number;
	totalBytes: number | null;
};

const useUpdater = () => {
	const [update, setUpdate] = useState<Update | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>({
		downloadedBytes: 0,
		totalBytes: null,
	});

	useEffect(() => {
		if (!update) {
			check()
				.then((nextUpdate) => {
					setUpdate(nextUpdate);
				})
				.catch((error) => {
					console.error("Failed to check for updates", error);
				});
		}
	}, [update]);

	const updateApp = useCallback(async () => {
		if (update && !isUpdating) {
			setIsUpdating(true);
			setDownloadProgress({ downloadedBytes: 0, totalBytes: null });

			let downloadedBytes = 0;
			let totalBytes: number | null = null;

			try {
				await update.downloadAndInstall((event: DownloadEvent) => {
					if (event.event === "Started") {
						totalBytes = event.data.contentLength ?? null;
						downloadedBytes = 0;
						setDownloadProgress({ downloadedBytes, totalBytes });
					} else if (event.event === "Progress") {
						downloadedBytes += event.data.chunkLength;
						setDownloadProgress({ downloadedBytes, totalBytes });
					} else if (event.event === "Finished") {
						setDownloadProgress({
							downloadedBytes:
								totalBytes === null ? downloadedBytes : totalBytes,
							totalBytes,
						});
					}
				});
				await relaunch();
			} catch (error) {
				console.error("Failed to download and install update", error);
			} finally {
				setIsUpdating(false);
			}
		}
	}, [update, isUpdating]);

	return { updateApp, update, isUpdating, downloadProgress };
};
export default useUpdater;

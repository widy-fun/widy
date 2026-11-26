import { Changelog, ISerializedAppError } from "@widy/sdk";
import { api } from ".";

export const updateApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getChangeLog: builder.query<Changelog, void>({
			queryFn: async () => {
				try {
					const response = await fetch(
						"https://raw.githubusercontent.com/widy-fun/widy/refs/heads/master/changelog.json",
					);
					if (!response.ok) {
						throw new Error(`HTTP ${response.status}`);
					}
					const changelog = (await response.json()) as Changelog;

					return { data: changelog };
				} catch (error) {
					return {
						error: {
							kind: "unknown",
							message: error instanceof Error ? error.message : String(error),
						} as unknown as ISerializedAppError,
					};
				}
			},
		}),
	}),
});
export const { useGetChangeLogQuery } = updateApi;

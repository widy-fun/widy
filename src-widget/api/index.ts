import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const widgetApi = createApi({
	reducerPath: "widget-api",
	tagTypes: ["Messages", "Widgets", "Donations"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:12553/api" }),
	endpoints: () => ({}),
});

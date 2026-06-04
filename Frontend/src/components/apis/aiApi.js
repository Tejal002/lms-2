import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log(API_KEY);
export const geminiApi = createApi({
  reducerPath: "geminiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/",
  }),
  endpoints: (builder) => ({
    generateSummary: builder.mutation({
      query: (prompt) => ({
        url: `models/gemini-3-flash-preview:generateContent?key=${API_KEY}`,
        method: "POST",
        body: {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
      }),
      transformResponse: (response) =>
        response?.candidates?.[0]?.content?.parts?.[0]?.text || "",
    }),
  }),
});


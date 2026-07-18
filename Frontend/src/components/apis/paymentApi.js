import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = "http://localhost:3000";

export const paymentApi = createApi({
  reducerPath: "paymentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/payment`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (amount) => ({
        url: "/create-order",
        method: "POST",
        body:amount  
      }),
    }),

    verifyPayment: builder.mutation({
      query: ({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }) => ({
        url: "/verify",
        method: "POST",
        body: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} = paymentApi;

export default paymentApi;
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authApi from '../apis/authApi.js'
import courseApi from '../apis/courseApi.js'
import enrollmentApi from '../apis/enrollmentApi.js'
import lectureApi from '../apis/lectureApi.js'
import authReducer from "../slices/authSlice.js"
import paymentApi from '../apis/paymentApi.js'


export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [enrollmentApi.reducerPath]:enrollmentApi.reducer,
    [lectureApi.reducerPath]:lectureApi.reducer,
    [paymentApi.reducerPath]:paymentApi.reducer
   
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(courseApi.middleware)
      .concat(enrollmentApi.middleware)
      .concat(lectureApi.middleware)
      .concat(paymentApi.middleware)
      
  ,
})


setupListeners(store.dispatch)
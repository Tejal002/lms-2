import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authApi from '../apis/authApi'
import courseApi from '../apis/courseApi'
import enrollmentApi from '../apis/enrollmentApi'
import lectureApi from '../apis/lectureApi'
import authReducer from "../slices/authSlice.js"
import { geminiApi } from '../apis/aiApi.js'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [enrollmentApi.reducerPath]:enrollmentApi.reducer,
    [lectureApi.reducerPath]:lectureApi.reducer,
   
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(courseApi.middleware)
      .concat(enrollmentApi.middleware)
      .concat(lectureApi.middleware)
      
  ,
})


setupListeners(store.dispatch)
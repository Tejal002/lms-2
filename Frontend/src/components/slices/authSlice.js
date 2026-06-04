import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        loginSlice: (state, action) => {
            state.user = action.payload,
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        logoutSlice: (state) => {
            localStorage.removeItem("user")
            state.user = null
        },
    },
})


export const { loginSlice,logoutSlice } = authSlice.actions

export default authSlice.reducer
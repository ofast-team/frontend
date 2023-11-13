import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState : {
        signedIn: false,
        id: null
    },
    reducers: {
        login: (state, action) => {
            state.id = action.payload
            state.signedIn = true
        },
        logout: (state) => {
            state.id = null
            state.signedIn = false
        }
    }
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer
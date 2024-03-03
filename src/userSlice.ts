import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    signedIn: false,
    verified: true,
    id: null,
  },
  reducers: {
    login: (state, action) => {
      const obj = action.payload
      state.id = obj.id
      state.verified = obj.isVerified
      state.signedIn = true
    },
    verify: (state) => {
      state.verified = true
    },
    logout: (state) => {
      state.id = null
      state.signedIn = false
      state.verified = true
    },
  },
})

export const { login, verify, logout } = userSlice.actions

export default userSlice.reducer

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface AuthedUserState {
    value: string | null
}

// Define the initial state using that type
const initialState: AuthedUserState = {
    value: null,
}

export const authedUserSlice = createSlice({
    name: "authedUser",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setAuthedUser: (state, action: PayloadAction<string | null>) => {
            state.value = action.payload
        },
    },
})

export const { setAuthedUser } = authedUserSlice.actions

export const selectAuthedUser = (state: RootState) => state.authedUser.value

export default authedUserSlice.reducer

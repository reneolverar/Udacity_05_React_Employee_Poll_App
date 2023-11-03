import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface UsersState {
    byId: {
        [key: string]: UserType
    }
    allIds: string[]
}

interface UserType {
    id: string
    password: string
    name: string
    avatarURL: string | null
    answers: {
        [index: string]: string
    }
    questions: string[]
    [key: string]: any
}

const initialState = {} as UsersState

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        receiveUsers: (state, action: PayloadAction<UsersState>) => {
            return action.payload
        },
        addQuestionToUser: (
            state,
            action: PayloadAction<{ authedUser: string; qId: string }>
        ) => {
            const { authedUser, qId } = action.payload
            state.byId[authedUser].questions.push(qId)
        },
        addAnswerToUser: (
            state,
            action: PayloadAction<{
                authedUser: string
                qId: string
                answer: string
            }>
        ) => {
            console.log(action.payload);
            
            const { authedUser, qId, answer } = action.payload
            state.byId[authedUser].answers[qId] = answer
        },
    },
})

export const { receiveUsers, addQuestionToUser, addAnswerToUser } =
    userSlice.actions

export const selectUsers = (state: RootState) => state.users

export default userSlice.reducer

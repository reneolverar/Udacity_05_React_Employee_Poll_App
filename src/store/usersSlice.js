import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "users",
    initialState: {},
    reducers: {
        receiveUsers: (state, action) => {
            return action.payload
        },
        addQuestionToUser: (state, action) => {
            const { authedUser, qId } = action.payload
            state.byId[authedUser].questions.push(qId)
        },
        addAnswerToUser: (state, action) => {
            const { authedUser, qId, answer } = action.payload
            state.byId[authedUser].answers = {
                ...state.byId[authedUser].answers,
                [qId]: answer,
            }
        },
    },
})

export const { receiveUsers, addQuestionToUser, addAnswerToUser } =
    userSlice.actions

export const selectUsers = (state) => state.users.value

export default userSlice.reducer

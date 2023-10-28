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
            return state.value.byId[authedUser].questions.push(qId)
        },
        addAnswerToUser: (state, action) => {
            const { authedUser, qId, answer } = action.payload
            return state.value.byId[authedUser].answers = {
                ...state.value.byId[authedUser].answers,
                [qId]: answer,
            }
        },
    },
})

export const { receiveUsers, addQuestionToUser, addAnswerToUser } =
    userSlice.actions

export const selectUsers = (state) => state.users.value

export default userSlice.reducer

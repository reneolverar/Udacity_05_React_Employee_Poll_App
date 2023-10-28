import { createSlice } from "@reduxjs/toolkit"

export const questionSlice = createSlice({
    name: "questions",
    initialState: {},
    reducers: {
        receiveQuestions: (state, action) => {
            return action.payload
        },
        addQuestion: (state, action) => {
            const question = action.payload
            state.byId[question.id] = question
            state.allIds.push(question.id)
        },
        removeQuestion: (state, action) => {
            const { question } = action.payload
            delete state.value.byId[question.id]
            state.value.allIds = state.value.allIds.filter(
                (id) => id !== question.id
            )
        },
        voteQuestion: (state, action) => {
            const { authedUser, qId, answer } = action.payload
            state.byId[qId][answer].votes.push(authedUser)
        },
    },
})

export const { receiveQuestions, addQuestion, voteQuestion } =
    questionSlice.actions

export const selectQuestions = (state) => state.questions.value

export default questionSlice.reducer

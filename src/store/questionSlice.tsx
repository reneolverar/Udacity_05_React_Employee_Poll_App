import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface QuestionsState {
    byId: {
        [key: string]: QuestionType
    }
    allIds: string[]
}

interface QuestionType {
    id: string
    author: string
    timestamp: number
    optionOne: {
        [index: string]: any
        votes: string[]
        text: string
    }
    optionTwo: {
        [index: string]: any
        votes: string[]
        text: string
    }
    [key: string]: any
}

const initialState = {} as QuestionsState

export const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        receiveQuestions: (state, action: PayloadAction<QuestionsState>) => {
            return action.payload
        },
        addQuestion: (state, action: PayloadAction<QuestionType>) => {
            const question = action.payload
            state.byId[question.id] = question
            state.allIds.push(question.id)
        },
        removeQuestion: (state, action: PayloadAction<string>) => {
            const id = action.payload
            delete state.byId[id]
            state.allIds = state.allIds.filter((qId) => qId !== id)
        },
        voteQuestion: (
            state,
            action: PayloadAction<{
                authedUser: string
                qId: string
                answer: string
            }>
        ) => {
            const { authedUser, qId, answer } = action.payload
            state.byId[qId][answer].votes.push(authedUser)
        },
    },
})

export const { receiveQuestions, addQuestion, voteQuestion } =
    questionSlice.actions

export const selectQuestions = (state: RootState) => state.questions

export default questionSlice.reducer

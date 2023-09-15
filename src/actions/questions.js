import { saveQuestion, saveQuestionAnswer } from "../utils/api"
import { showLoading, hideLoading } from "react-redux-loading-bar"

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const ADD_QUESTION = "ADD_QUESTION"
export const REMOVE_QUESTION = "REMOVE_QUESTION"
export const VOTE_QUESTION = "VOTE_QUESTION"

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        const newQuestion = {
            author: authedUser,
            optionOneText,
            optionTwoText,
        }
        return saveQuestion(newQuestion)
            .catch((e) => {
                console.warn(
                    "Error in handleAddQuestion: ",
                    e,
                    ". Tried to add poll: ",
                    newQuestion
                )
                alert(
                    "There was an error adding the question, please try again"
                )
            })
            .then((question) => {
                dispatch(addQuestion(question))
                return question
            })
            .then((question) => {
                dispatch(hideLoading())
                return question
            })
    }
}

export function removeQuestion(id) {
    return {
        type: REMOVE_QUESTION,
        id,
    }
}

function voteQuestion({ authedUser, qid, answer }) {
    return {
        type: VOTE_QUESTION,
        authedUser,
        qid,
        answer,
    }
}

export function handleVoteQuestion(info) {
    return (dispatch) => {
        dispatch(voteQuestion(info))
        return saveQuestionAnswer(info).catch((e) => {
            console.warn("Error in handleVoteQuestion: ", e)
            dispatch(voteQuestion(info))
            alert("There was an error saving the vote. Please try again")
        })
    }
}

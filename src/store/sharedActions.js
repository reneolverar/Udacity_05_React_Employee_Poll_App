import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api"
import { showLoading, hideLoading } from "react-redux-loading-bar"
import { receiveQuestions, addQuestion, voteQuestion } from "./questionSlice"
import { receiveUsers, addAnswerToUser, addQuestionToUser } from "./usersSlice"

// const AUTHED_ID = null
// const AUTHED_ID = "tylermcginnis"

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
    }
}

export function handleAddQuestion({optionOneText, optionTwoText}) {
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
                dispatch(addQuestionToUser({authedUser, qId: question.id}))
                dispatch(hideLoading())
                return question
            })
    }
}

export function handleVoteQuestion({qId, answer}) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveQuestionAnswer({authedUser, qId, answer})
            .catch((e) => {
                console.warn("Error in handleVoteQuestion: ", e)
                alert("There was an error saving the vote. Please try again")
            })
            .then((res) => {
                dispatch(voteQuestion({authedUser, qId, answer}))
                dispatch(addAnswerToUser({authedUser, qId, answer}))
                dispatch(hideLoading())
                return res
            })
    }
}

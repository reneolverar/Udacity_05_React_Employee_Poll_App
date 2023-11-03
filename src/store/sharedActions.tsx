import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api"
import { showLoading, hideLoading } from "react-redux-loading-bar"
import { receiveQuestions, addQuestion, voteQuestion } from "./questionSlice"
import { receiveUsers, addAnswerToUser, addQuestionToUser } from "./usersSlice"
import { AppDispatch, RootState } from "./store"

// const AUTHED_ID = null
// const AUTHED_ID = "tylermcginnis"

export function handleInitialData() {
    return (dispatch: AppDispatch) => {
        dispatch(showLoading())
        return getInitialData().then(({ users, questions }) => {
            console.log(users, questions);
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
    }
}

export function handleAddQuestion(optionOneText: string, optionTwoText: string) {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const authedUser = getState().authedUser.value as string
        console.log(authedUser);

        dispatch(showLoading())
        const newQuestion = {
            author: authedUser,
            optionOneText,
            optionTwoText,
        }
        console.log(newQuestion)
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
                console.log(question);
                console.log(authedUser);
                dispatch(addQuestion(question))
                dispatch(addQuestionToUser({ authedUser, qId: question.id } ))
                dispatch(hideLoading())
                return question
            })
    }
}

export function handleVoteQuestion({
    qId,
    answer,
}: {
    qId: string
    answer: string
}) {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const authedUser = getState().authedUser.value as string
        console.log(authedUser);
        dispatch(showLoading())
        return saveQuestionAnswer({ authedUser, qId, answer })
            .catch((e) => {
                console.warn("Error in handleVoteQuestion: ", e)
                alert("There was an error saving the vote. Please try again")
            })
            .then((res) => {
                dispatch(voteQuestion({ authedUser, qId, answer }))
                dispatch(addAnswerToUser({ authedUser, qId, answer }))
                dispatch(hideLoading())
                return res
            })
    }
}

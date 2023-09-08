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

export function removeQuestion(id) {
    return {
        type: REMOVE_QUESTION,
        id,
    }
}

export function voteQuestion(questionId, option, userId) {
    return {
        type: VOTE_QUESTION,
        questionId,
        option,
        userId,
    }
}
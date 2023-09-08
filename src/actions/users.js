export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER = "ADD_USER"
export const REMOVE_USER = "REMOVE_USER"
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER"
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER"

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addUser(user) {
    return {
        type: ADD_USER,
        user,
    }
}

export function removeUser(user) {
    return {
        type: REMOVE_USER,
        user,
    }
}

export function addQuestionToUser(userId, questionId) {
    return {
        type: ADD_QUESTION_TO_USER,
        userId,
        questionId,
    }
}

export function addAnswerToUser(userId, questionId, answer) {
    return {
        type: ADD_ANSWER_TO_USER,
        userId,
        questionId,
        answer,
    }
}
import { RECEIVE_USERS } from "../actions/users"
import { ADD_USER } from "../actions/users"
import { REMOVE_USER } from "../actions/users"
import { ADD_QUESTION_TO_USER } from "../actions/users"
import { ADD_ANSWER_TO_USER } from "../actions/users"

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            }
        case ADD_USER:
            return [...state, { ...action.user, answer: {}, questions: [] }]
        case REMOVE_USER:
            return state.filter((user) => user.id !== action.id)
        case ADD_QUESTION_TO_USER:
            return state.map((user) =>
                user.id !== action.userId
                    ? user
                    : {
                          ...user,
                          questions: [...user.questions, action.questionId],
                      }
            )
        case ADD_ANSWER_TO_USER:
            return state.map((user) =>
                user.id !== action.userId
                    ? user
                    : {
                          ...user,
                          answers: {
                              ...user.answers,
                              [action.questionId]: action.answer,
                          },
                      }
            )
        default:
            return state
    }
}

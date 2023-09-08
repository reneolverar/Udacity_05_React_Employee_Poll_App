import { RECEIVE_QUESTIONS } from "../actions/questions"
import { ADD_QUESTION } from "../actions/questions"
import { REMOVE_QUESTION } from "../actions/questions"
import { VOTE_QUESTION } from "../actions/questions"

export default function questions(state = [], action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            }
        case ADD_QUESTION:
            return [
                ...state,
                {
                    ...action.question,
                    timestamp: new Date().getDate(),
                    optionOne: {
                        ...action.question.optionOne,
                        votes: [],
                    },
                    optionTwo: {
                        ...action.question.optionTwo,
                        votes: [],
                    },
                },
            ]
        case REMOVE_QUESTION:
            return state.filter((question) => question.id !== action.id)
        case VOTE_QUESTION:
            return state.map((question) =>
                question.id !== action.questionId
                    ? question
                    : action.option === "optionOne"
                    ? {
                          ...question,
                          optionOne: {
                              ...question.optionOne,
                              votes: [
                                  ...question.optionOne.votes,
                                  action.userId,
                              ],
                          },
                      }
                    : {
                          ...question,
                          optionTwo: {
                              ...question.optionTwo,
                              votes: [
                                  ...question.optionTwo.votes,
                                  action.userId,
                              ],
                          },
                      }
            )
        default:
            return state
    }
}

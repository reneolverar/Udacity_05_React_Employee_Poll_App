import {
    RECEIVE_QUESTIONS,
    ADD_QUESTION,
    REMOVE_QUESTION,
    VOTE_QUESTION,
} from "../actions/questions"

export default function questions(state = [], action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            }
        case ADD_QUESTION:
            const { question } = action
            return {
                byId: {
                    ...state.byId,
                    [question.id]: {
                        ...question,
                        optionOne: {
                            ...question.optionOne,
                            votes: [],
                        },
                        optionTwo: {
                            ...question.optionTwo,
                            votes: [],
                        },
                    },
                },
                allIds: [...state.allIds, question.id]
            }
        case REMOVE_QUESTION:
            delete state.byId[question.id]
            return {
                byId: state.byId,
                allIds: state.allIds.filter((id) => id !== action.id)
            }

        case VOTE_QUESTION:
            console.log(state)
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [question.qid]: {
                        ...state.byId[question.qid],
                        [question.answer]: {
                            ...state.byId[question.qid][question.answer],
                            votes: [
                                ...state.byId[question.qid][question.answer].votes,
                                question.authedUser,
                            ],
                        },
                    },
                },
            }
        default:
            return state
    }
}

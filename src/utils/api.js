import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
} from "./_DATA.js"
import { formatDate, normalize } from "./helpers.js"

export function getInitialData() {
    return Promise.all([_getUsers(), _getQuestions()]).then(
        ([users, questions]) => {
            for (const key in questions) {
                if (Object.hasOwnProperty.call(questions, key)) {
                    questions[key] = {
                        ...questions[key],
                        timestamp: formatDate(questions[key].timestamp)
                    }

                }
            }
            return ({
            users: normalize(users),
            questions: normalize(questions),
        })}
    )
}

export function saveQuestion(info) {
    return _saveQuestion(info)
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info)
}

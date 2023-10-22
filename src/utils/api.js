import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
} from "./_DATA.js"
import { normalize } from "./helpers.js"

// Users object array format
// users = {
//     byId: {
//         id: {
//             id,
//             password,
//             name,
//             avatarURL,
//             answers: {
//                 questionId: questionAnswer,
//             },
//             questions: [id]
//         },
//     },
//     allIds: [id],
// }

// Questions object array format
// questions = {
//     byId: {
//         id: {
//             id,
//             author,
//             timestamp,
//             optionOne: {
//                 votes: [userId],
//                 text
//             },
//             optionTwo: {
//                 votes: [userId],
//                 text
//             }
//         }
//     },
//     allIds: [id]
// }

// export function getInitialData() {
//     return Promise.all([_getUsers(), _getQuestions()]).then(
//         ([users, questions]) => {
//             for (const key in questions) {
//                 if (Object.hasOwnProperty.call(questions, key)) {
//                     questions[key] = {
//                         ...questions[key],
//                         timestamp: formatDate(questions[key].timestamp),
//                     }
//                 }
//             }
//             return {
//                 users: normalize(users),
//                 questions: normalize(questions),
//             }
//         }
//     )
// }

export function getInitialData() {
    return Promise.all([_getUsers(), _getQuestions()]).then(
        ([users, questions]) => ({
            users: normalize(users),
            questions: normalize(questions),
        })
    )
}

export function getUsers() {
    return _getUsers().then(result => normalize(result))
}

export function getQuestions() {
    return _getQuestions().then(result => normalize(result))
}

export function saveQuestion(info) {
    return _saveQuestion(info)
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info)
}

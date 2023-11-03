import {
    getInitialData,
    getQuestions,
    getUsers,
    saveQuestion,
    saveQuestionAnswer,
} from "./api"
const _ = require('lodash')

describe("getInitialData", () => {
    it("will return the users and questions in a normalized form", async () => {
        const { users, questions } = await getInitialData()
        expect(users).toHaveProperty("byId")
        expect(users).toHaveProperty("allIds")
        expect(users.allIds.length).toBeGreaterThan(0)

        expect(questions).toHaveProperty("byId")
        expect(questions).toHaveProperty("allIds")
        expect(questions.allIds.length).toBeGreaterThan(0)
    })
})

describe("saveQuestion", () => {
    const author = "zoshikanlu"
    const optionOneText = "text 1"
    const optionTwoText = "text 2"
    const newQuestion = { author, optionOneText, optionTwoText }

    it("will reject if all fields are not passed", async () => {
        const incompleteQuestion1 = { author }
        await expect(saveQuestion(incompleteQuestion1)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        )
        const incompleteQuestion2 = { author, optionOneText }
        await expect(saveQuestion(incompleteQuestion2)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        )
    })

    it("will pass if all fields are passed", async () => {
        const savedQuestion = await saveQuestion(newQuestion)

        expect(savedQuestion.author).toBe(author)
        expect(savedQuestion.optionOne.text).toBe(optionOneText)
        expect(savedQuestion.optionTwo.text).toBe(optionTwoText)

        const newQuestions = await getQuestions()
        const newUsers = await getUsers()
        expect(newQuestions.byId[savedQuestion.id]).toEqual(savedQuestion)
        expect(newUsers.byId[author].questions.includes(savedQuestion.id)).toBe(true)
    })
})

describe("saveQuestionAnswer", () => {
    it("will reject if all fields are not passed", async () => {
        const answer = "optionOne"
        const qId = "1"
        const incompleteAnswer1 = { answer }
        await expect(saveQuestionAnswer(incompleteAnswer1)).rejects.toEqual(
            "Please provide authedUser, qId, and answer"
        )
        const incompleteAnswer2 = { answer, qId }
        await expect(saveQuestionAnswer(incompleteAnswer2)).rejects.toEqual(
            "Please provide authedUser, qId, and answer"
        )
    })

    it("will pass if all fields are passed", async () => {
        const authedUser = "zoshikanlu"
        const qId = "8xf0y6ziyjabvozdd253nd"
        const answer = "optionOne"

        const { users, questions } = await getInitialData()
        // Check that question has not been voted by user
        expect(questions.byId[qId][answer].votes.includes(authedUser)).toBe(
            false
        )
        // Check that user doesn´t have the question voted
        expect(users.byId[authedUser].answers[qId]).toBe(undefined)

        const answerResult = await saveQuestionAnswer({
            authedUser,
            qId,
            answer,
        })
        // Check that call returns true
        expect(answerResult).toBe(true)

        const newQuestions = await getQuestions()
        const newUsers = await getUsers()
        // Check that question has been voted by user
        expect(newQuestions.byId[qId][answer].votes.includes(authedUser)).toBe(
            true
        )
        // Check that user have the question voted
        expect(newUsers.byId[authedUser].answers[qId]).toBe(answer)

    })
})

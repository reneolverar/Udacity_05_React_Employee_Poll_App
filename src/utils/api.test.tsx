import {
    getInitialData,
    getQuestions,
    getUsers,
    saveQuestion,
    saveQuestionAnswer,
} from "./api"
import { _saveQuestion, _saveQuestionAnswer } from "./_DATA"
const _ = require("lodash")

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

describe("_saveQuestion & saveQuestion", () => {
    const author = "zoshikanlu"
    const optionOneText = "text 1"
    const optionTwoText = "text 2"
    const newQuestion = { author, optionOneText, optionTwoText }
    it("will reject if all fields are not passed", async () => {
        const incompleteQuestion1 = { author }
        const incompleteQuestion2 = { author, optionOneText }

        // api.js tests for saveQuestion
        await expect(saveQuestion(incompleteQuestion1)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        )
        await expect(saveQuestion(incompleteQuestion2)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        )

        // _DATA.js tests for _saveQuestion
        await expect(_saveQuestion(incompleteQuestion1)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        )
        await expect(_saveQuestion(incompleteQuestion2)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        )

        // _DATA.js tests for _saveQuestion
        await expect(_saveQuestion(incompleteQuestion1)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        )
        await expect(_saveQuestion(incompleteQuestion2)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        )
    })

    it("will pass if all fields are passed", async () => {
        // Call savedQuestion and _saveQuestion and get results
        const savedQuestion = await saveQuestion(newQuestion)
        const _savedQuestion = await _saveQuestion(newQuestion)
        const newQuestions = await getQuestions()
        const newUsers = await getUsers()

        // api.js tests for saveQuestion
        expect(savedQuestion.id).toBeDefined()
        expect(savedQuestion.author).toBe(author)
        expect(savedQuestion.timestamp).toBeDefined()
        expect(savedQuestion.optionOne.text).toBe(optionOneText)
        expect(savedQuestion.optionTwo.text).toBe(optionTwoText)
        expect(savedQuestion.optionOne.votes.length).toBe(0)
        expect(savedQuestion.optionTwo.votes.length).toBe(0)
        expect(newQuestions.byId[savedQuestion.id]).toEqual(savedQuestion)
        expect(newUsers.byId[author].questions.includes(savedQuestion.id)).toBe(
            true
        )

        // _DATA.js tests for _saveQuestion
        expect(_savedQuestion.id).toBeDefined()
        expect(_savedQuestion.author).toBe(author)
        expect(_savedQuestion.timestamp).toBeDefined()
        expect(_savedQuestion.optionOne.text).toBe(optionOneText)
        expect(_savedQuestion.optionTwo.text).toBe(optionTwoText)
        expect(_savedQuestion.optionOne.votes.length).toBe(0)
        expect(_savedQuestion.optionTwo.votes.length).toBe(0)
        expect(newQuestions.byId[_savedQuestion.id]).toEqual(_savedQuestion)
        expect(
            newUsers.byId[author].questions.includes(_savedQuestion.id)
        ).toBe(true)
        expect(newUsers.byId[author].questions.includes(savedQuestion.id)).toBe(true)
        expect(newUsers.byId[author].questions.includes(savedQuestion.id)).toBe(
            true
        )

        // _DATA.js tests for _saveQuestion
        expect(_savedQuestion.author).toBe(author)
        expect(_savedQuestion.optionOne.text).toBe(optionOneText)
        expect(_savedQuestion.optionTwo.text).toBe(optionTwoText)
        expect(newQuestions.byId[_savedQuestion.id]).toEqual(_savedQuestion)
        expect(
            newUsers.byId[author].questions.includes(_savedQuestion.id)
        ).toBe(true)
    })
})

describe("_saveQuestionAnswer & saveQuestionAnswer", () => {
    it("will reject if all fields are not passed", async () => {
        const answer = "optionOne"
        const qId = "1"
        const incompleteAnswer1 = { answer, qId: null, authedUser: null }
        const incompleteAnswer2 = { answer, qId, authedUser: null }

        // api.js tests for saveQuestion
        await expect(saveQuestionAnswer(incompleteAnswer1)).rejects.toEqual(
            "Please provide authedUser, qId, and answer"
        )
        await expect(saveQuestionAnswer(incompleteAnswer2)).rejects.toEqual(
            "Please provide authedUser, qId, and answer"
        )

        // _DATA.js tests for _saveQuestion
        await expect(_saveQuestionAnswer(incompleteAnswer1)).rejects.toEqual(
            "Please provide authedUser, qId, and answer"
        )
        await expect(_saveQuestionAnswer(incompleteAnswer2)).rejects.toEqual(
            "Please provide authedUser, qId, and answer"
        )
    })

    it("will pass if all fields are passed", async () => {
        const authedUser = "zoshikanlu"
        const answer = "optionOne"
        const qId1 = "8xf0y6ziyjabvozdd253nd"
        const qId2 = "6ni6ok3ym7mf1p33lnez"

        const { users, questions } = await getInitialData()
        // Check that questions has not been voted by user
        expect(questions.byId[qId1][answer].votes.includes(authedUser)).toBe(
            false
        )
        expect(questions.byId[qId2][answer].votes.includes(authedUser)).toBe(
            false
        )
        // Check that user doesn´t have the questions voted
        expect(users.byId[authedUser].answers[qId1]).toBe(undefined)
        expect(users.byId[authedUser].answers[qId2]).toBe(undefined)

        // Check that saveQuestionAnswer return true
        expect(
            await saveQuestionAnswer({
                authedUser,
                qId: qId1,
                answer,
            })
        ).toBe(true)

        // Check that _saveQuestionAnswer return true
        expect(
            await _saveQuestionAnswer({
                authedUser,
                qId: qId2,
                answer,
            })
        ).toBe(true)

        const newQuestions = await getQuestions()
        const newUsers = await getUsers()

        // api.js tests for saveQuestionAnswer
        // Check that question has been voted by user
        expect(newQuestions.byId[qId1][answer].votes.includes(authedUser)).toBe(
            true
        )
        // Check that user have the question voted
        expect(newUsers.byId[authedUser].answers[qId1]).toBe(answer)

        // _DATA.js tests for _saveQuestionAnswer
        // Check that question has been voted by user
        expect(newQuestions.byId[qId2][answer].votes.includes(authedUser)).toBe(
            true
        )
        // Check that user have the question voted
        expect(newUsers.byId[authedUser].answers[qId2]).toBe(answer)
    })
})

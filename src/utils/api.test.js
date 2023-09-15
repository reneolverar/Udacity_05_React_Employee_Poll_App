const { getInitialData, saveQuestion, saveQuestionAnswer } = require("./api.js")

let results

beforeAll(async () => {
    results = await getInitialData()
    return results
})

describe("getInitialData", () => {
    it("will return the users and questions in a normalized form", async () => {
        expect(results.users).toHaveProperty("byId")
        expect(results.users).toHaveProperty("allIds")
        expect(results.users.allIds.length).toBeGreaterThan(0)

        expect(results.questions).toHaveProperty("byId")
        expect(results.questions).toHaveProperty("allIds")
        expect(results.questions.allIds.length).toBeGreaterThan(0)
    })
})

describe("saveQuestion", () => {
    const author = "1"
    const optionOneText = "text 1"
    const optionTwoText = "text 2"
    const newQuestion = { author, optionOneText, optionTwoText }

    it("will reject if all fields are not passed", async () => {
        let newIncompleteQuestion = { author }
        await expect(saveQuestion(newIncompleteQuestion)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        )
        newIncompleteQuestion = { author, optionOneText }
        await expect(saveQuestion(newIncompleteQuestion)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        )
    })

    it("will pass if all fields are passed", async () => {
        const result = await saveQuestion(newQuestion)
        expect(result.author).toBe(author)
        expect(result.optionOne.text).toBe(optionOneText)
        expect(result.optionTwo.text).toBe(optionTwoText)
    })
})

describe("saveQuestionAnswer", () => {

    it("will reject if all fields are not passed", async () => {
        const answer = "optionOne"
        const qid = "1"
        let newIncompleteAnswer = { answer }
        await expect(saveQuestionAnswer(newIncompleteAnswer)).rejects.toEqual(
            "Please provide authedUser, qid, and answer"
        )
        newIncompleteAnswer = { answer, qid }
        await expect(saveQuestionAnswer(newIncompleteAnswer)).rejects.toEqual(
            "Please provide authedUser, qid, and answer"
        )
    })

    it("will pass if all fields are passed", async () => {
        const authedUser = "tylermcginnis"
        const qid = "8xf0y6ziyjabvozdd253nd"
        const answer = "optionOne"
        const newAnswer = { authedUser, qid, answer }
        const answerResult = await saveQuestionAnswer(newAnswer)
        expect(answerResult).toBe(true)
    })
})

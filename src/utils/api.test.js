import {
    getInitialData,
    getQuestions,
    getUsers,
    saveQuestion,
    saveQuestionAnswer,
} from "./api"

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
        const { users, questions } = await getInitialData()
        expect(questions.allIds.length).toEqual(6)
        expect(users.byId[author].questions.length).toEqual(0)

        const result = await saveQuestion(newQuestion)
        expect(result.author).toBe(author)
        expect(result.optionOne.text).toBe(optionOneText)
        expect(result.optionTwo.text).toBe(optionTwoText)

        const newQuestions = await getQuestions()
        const newUsers = await getUsers()
        expect(newQuestions.allIds.length).toEqual(7)
        expect(newUsers.byId[author].questions.length).toEqual(1)
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
        const authedUser = "zoshikanlu"
        const qid = "8xf0y6ziyjabvozdd253nd"
        const answer = "optionOne"

        const { users, questions } = await getInitialData()
        // Check that question has not been voted by user
        expect(questions.byId[qid][answer].votes.includes(authedUser)).toBe(
            false
        )
        // Check that user doesn´t have the question voted
        expect(users.byId[authedUser].answers[qid]).toBe(undefined)

        const answerResult = await saveQuestionAnswer({
            authedUser,
            qid,
            answer,
        })
        // Check that call returns true
        expect(answerResult).toBe(true)

        const newQuestions = await getQuestions()
        const newUsers = await getUsers()
        // Check that question has been voted by user
        expect(newQuestions.byId[qid][answer].votes.includes(authedUser)).toBe(
            true
        )
        // Check that user have the question voted
        expect(newUsers.byId[authedUser].answers[qid]).toBe(answer)

    })
})

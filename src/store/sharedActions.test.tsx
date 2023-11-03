import { createStore } from "../utils/test-utils"
import { handleAddQuestion, handleVoteQuestion } from "./sharedActions"
import { setAuthedUser } from "./authedUserSlice"

describe("Store actions", () => {
    it("will add a question", async () => {
        // Create store and initialize data, set logged user
        const authedUser = "zoshikanlu"
        const store = await createStore()
        store.dispatch(setAuthedUser(authedUser))

        // Confirm current total questions
        let totalQuestions = store.getState().questions.allIds.length
        expect(totalQuestions).toBe(6)
        let userQuestions = store.getState().users.byId[authedUser].questions
        expect(userQuestions.length).toBe(0)

        // Create new question
        const optionOneText = "action.test 1"
        const optionTwoText = "action.test 2"
        const newQuestion = await store.dispatch(handleAddQuestion(optionOneText, optionTwoText))

        // Confirm new questions was added to questions and logged user
        totalQuestions = store.getState().questions.allIds.length
        expect(totalQuestions).toBe(7)
        userQuestions = store.getState().users.byId[authedUser].questions
        expect(userQuestions.includes(newQuestion.id)).toBe(true)
    })

    it("will vote a question", async () => {
        // Create store and initialize data, set logged user
        const authedUser = "zoshikanlu"
        const qId = "6ni6ok3ym7mf1p33lnez"
        const store = await createStore()
        store.dispatch(setAuthedUser(authedUser))

        // Confirm current total votes in users and questions
        let totalVotes = store.getState().questions.byId[qId].optionOne.votes
        expect(totalVotes.length).toBe(0)
        let totalVoted = store.getState().users.byId[authedUser].answers
        expect(Object.keys(totalVoted).length).toBe(1)

        // Vote questions
        const answer = "optionOne"
        await store.dispatch(handleVoteQuestion({ qId, answer }))

        // Confirm questions was updated in questions and logged user
        totalVotes = store.getState().questions.byId[qId].optionOne.votes
        expect(totalVotes.length).toBe(1)
        totalVoted = store.getState().users.byId[authedUser].answers
        expect(Object.keys(totalVoted).length).toBe(2)
    })
})
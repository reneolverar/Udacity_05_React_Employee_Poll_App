import { screen, configure } from "@testing-library/react"
import { initialData, renderWithProviders } from "../../utils/test-utils"
import Leaderboard from "../Leaderboard"
import { handleAddQuestion, handleVoteQuestion } from "../../store/sharedActions"
const _ = require("lodash")

beforeEach(() => {
    configure({
        throwSuggestions: true,
        //  const incrementControl = screen.getByText('Increment', { suggest: true })
    })
})

describe("Leaderboard", () => {
    it("will match the snapshot", () => {
        renderWithProviders(<Leaderboard />, {
            preloadedState: initialData,
        })
        expect(screen).toMatchSnapshot()
    })

    it("will have all expected fields", () => {
        renderWithProviders(<Leaderboard />, {
            preloadedState: initialData,
        })
        expect(
            screen.getByRole("heading", { name: /Leaderboard/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole("row", { name: /Users Answered Created/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole("row", { name: /Sarah Edo sarahedo 4 2/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole("row", { name: /Mike Tsamis mtsamis 3 2/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole("row", {
                name: /Tyler McGinnis tylermcginnis 2 2/i,
            })
        ).toBeInTheDocument()
        expect(
            screen.getByRole("row", {
                name: /Zenobia Oshikanlu zoshikanlu 1 0/i,
            })
        ).toBeInTheDocument()
    })

    it("will update the leaderboard when voting", async () => {
        const clonedData = _.cloneDeep(initialData)
        clonedData.users.byId["sarahedo"].answers = {}
        const { store } = renderWithProviders(<Leaderboard />, {
            preloadedState: clonedData,
        })
        const rows = screen.getAllByRole("row")
        // Check that mtsamis is now in first place
        expect(rows[1].textContent?.includes("mtsamis")).toBe(true)
        // Check that sarahedo is now in second place
        expect(rows[3].textContent?.includes("sarahedo")).toBe(true)
        expect(
            screen.getByRole("row", { name: /sarahedo 0 2/i })
        ).toBeInTheDocument()

        const answers = [
            { qId: "8xf0y6ziyjabvozdd253nd", answer: "optionOne" },
            { qId: "6ni6ok3ym7mf1p33lnez", answer: "optionOne" },
            { qId: "am8ehyc8byjqgar0jgpub9", answer: "optionTwo" },
            { qId: "loxhs1bqm25b708cmbf3g", answer: "optionTwo" },
        ]

        // Check that leaderboard updates when voting
        await store.dispatch(handleVoteQuestion(answers[0]))
        expect(
            screen.getByRole("row", { name: /sarahedo 1 2/i })
        ).toBeInTheDocument()

        // Vote for 3 more questions to finish in 1rst place
        await store.dispatch(handleVoteQuestion(answers[1]))
        await store.dispatch(handleVoteQuestion(answers[2]))
        await store.dispatch(handleVoteQuestion(answers[3]))

        expect(
            screen.getByRole("row", { name: /sarahedo 4 2/i })
        ).toBeInTheDocument()
        const newRows = screen.getAllByRole("row")
        expect(newRows[1].textContent?.includes("sarahedo")).toBe(true)
    })

    it("will update the leaderboard when creating question", async () => {
        const clonedData = _.cloneDeep(initialData)
        clonedData.users.byId["sarahedo"].questions = []
        const { store } = renderWithProviders(<Leaderboard />, {
            preloadedState: clonedData,
        })

        // Check that user has no created questions
        expect(
            screen.getByRole("row", { name: /sarahedo 4 0/i })
        ).toBeInTheDocument()

        const optionOneText = "Leaderboard.test T1"
        const optionTwoText = "Leaderboard.test T2"

        // Check that leaderboard updates when creating a question
        await store.dispatch(handleAddQuestion(optionOneText, optionTwoText))
        expect(
            screen.getByRole("row", { name: /sarahedo 4 1/i })
        ).toBeInTheDocument()
    })
})

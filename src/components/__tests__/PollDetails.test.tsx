import { screen, configure, logRoles, fireEvent } from "@testing-library/react"
import { initialData, renderWithProviders } from "../../utils/test-utils"
import PollDetails from "../PollDetails"
import { MemoryRouter, Route, Routes } from "react-router-dom"
const _ = require("lodash")

const mockPollDetails = (qId: string) => (
    <MemoryRouter initialEntries={[`/poll/${qId}`]}>
        <Routes>
            <Route
                path="/poll/:id"
                element={<PollDetails />}
            />
        </Routes>
    </MemoryRouter>
)

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
})

describe("PollDetails", () => {
    it("will match the snapshot", async () => {
        const qId = "xj352vofupe1dqz9emx13r"
        renderWithProviders(mockPollDetails(qId), {
            preloadedState: initialData,
        })
        expect(screen).toMatchSnapshot()
    })

    it("will have all expected fields", () => {
        const qId = "xj352vofupe1dqz9emx13r"
        renderWithProviders(mockPollDetails(qId), {
            preloadedState: initialData,
        })

        expect(
            screen.getByRole("heading", {
                name: /poll by mike tsamis/i,
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole("heading", {
                name: /@mtsamis/i,
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole("img", {
                name: /app logo instead of avatar/i,
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole("heading", {
                name: /would you rather:/i,
            })
        ).toBeInTheDocument()

        const question = initialData.questions.byId[qId]

        // Find option 1 and option 2 in the document
        const [q1Btn, q2Btn] = screen.getAllByRole("button", { name: /click/i })
        expect(screen.getByText(question.optionOne.text)).toBeInTheDocument()
        expect(screen.getByText(question.optionTwo.text)).toBeInTheDocument()
        expect(q1Btn).toBeInTheDocument()
        expect(q2Btn).toBeInTheDocument()

        // Question is not voted by authedUser yet so buttons should not be disabled
        expect(q1Btn).not.toBeDisabled()
        expect(q2Btn).not.toBeDisabled()

        // Questions should have two votes already
        expect(question.optionOne.votes.length).toBe(2)
    })

    it("will vote for option 1 if not yet voted", async () => {
        const qId = "xj352vofupe1dqz9emx13r"
        const clonedData = _.cloneDeep(initialData)

        const { store } = renderWithProviders(mockPollDetails(qId), {
            preloadedState: clonedData,
        })

        // optionOne should have two votes already
        const question = store.getState().questions.byId[qId]
        expect(question.optionOne.votes.length).toBe(2)

        const [q1Btn, q2Btn] = screen.getAllByRole("button", { name: /click/i })


        await fireEvent.click(q1Btn)

        // Should get voted msg
        const thanksMsg = await screen.findByText(/thank you for voting!/i)
        expect(thanksMsg).toBeInTheDocument()

        // Buttons should be disabled
        expect(q1Btn).toBeDisabled()
        expect(q2Btn).toBeDisabled()

        // optionOne should have 3 votes
        const updatedQuestion = store.getState().questions.byId[qId]
        expect(updatedQuestion.optionOne.votes.length).toBe(3)

        const numVotesText = screen.getByText(
            /Option One has 3 votes \(0\.75%\)/i
        )
        expect(numVotesText).toBeInTheDocument()
    })

    it("will vote for option 2 if not yet voted", async () => {
        const clonedData = _.cloneDeep(initialData)
        const qId = "xj352vofupe1dqz9emx13r"

        const { store, container } = renderWithProviders(mockPollDetails(qId), {
            preloadedState: clonedData,
        })
        // screen.debug()
        // logRoles(container)

        // optionTwo should have two votes already
        const question = store.getState().questions.byId[qId]
        expect(question.optionTwo.votes.length).toBe(1)

        const [q1Btn, q2Btn] = screen.getAllByRole("button", { name: /click/i })

        await fireEvent.click(q2Btn)

        // Should get voted msg
        const thanksMsg = await screen.findByText(/thank you for voting!/i)
        expect(thanksMsg).toBeInTheDocument()

        // Buttons should be disabled
        expect(q1Btn).toBeDisabled()
        expect(q2Btn).toBeDisabled()

        // Question should have 3 votes
        const updatedQuestion = store.getState().questions.byId[qId]
        expect(updatedQuestion.optionTwo.votes.length).toBe(2)

        const numVotesText = screen.getByText(
            /option Two has 2 votes \(0\.50%\)/i
        )
        expect(numVotesText).toBeInTheDocument()
    })
})

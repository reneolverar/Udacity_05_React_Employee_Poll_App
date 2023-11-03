import { screen, configure, fireEvent, waitFor } from "@testing-library/react"
import { initialData, renderWithProviders } from "../../utils/test-utils"
import PollsDashboard from "../PollsDashboard"
import { MemoryRouter, Router } from "react-router-dom"
import { createMemoryHistory } from "history"
import { handleVoteQuestion } from "../../store/sharedActions"
const _ = require("lodash")

beforeEach(() => {
    configure({
        throwSuggestions: true,
        //  const incrementControl = screen.getByText('Increment', { suggest: true })
    })
})

describe("PollsDashboard", () => {
    it("will match the snapshot", () => {
        renderWithProviders(
            <MemoryRouter>
                <PollsDashboard />
            </MemoryRouter>,
            {
                preloadedState: initialData,
            }
        )
        expect(screen).toMatchSnapshot()
    })

    it("will have all expected fields", () => {
        renderWithProviders(
            <MemoryRouter>
                <PollsDashboard />
            </MemoryRouter>,
            {
                preloadedState: initialData,
            }
        )

        expect(
            screen.getByRole("heading", {
                name: /new questions/i,
            })
        ).toBeInTheDocument()

        expect(
            screen.getByRole("heading", { name: /done/i })
        ).toBeInTheDocument()

        // Container "New Questions" is active by default so only those questions should be shown
        expect(
            screen.getAllByRole("heading", { name: /mtsamis/i }).length
        ).toBe(1)

        expect(screen.getByText(/9:16:pm \| 30\/04\/2017/i)).toBeInTheDocument()
        expect(screen.getAllByRole("button", { name: /show/i }).length).toBe(2)
    })

    it("will have toggle between question containers", () => {
        const { container } = renderWithProviders(
            <MemoryRouter>
                <PollsDashboard />
            </MemoryRouter>,
            {
                preloadedState: initialData,
            }
        )

        // Check that New Questions is active
        const newQuestionsHeading = screen.getByRole("heading", {
            name: /new questions/i,
        })
        expect(newQuestionsHeading).toHaveClass("bg-blue-950")
        expect(newQuestionsHeading).toHaveClass("text-white")
        expect(screen.getAllByRole("button", { name: /show/i }).length).toBe(2)

        // Check that Done is not active
        const doneHeading = screen.getByRole("heading", {
            name: /done/i,
        })
        expect(doneHeading).not.toHaveClass("bg-blue-950")
        expect(doneHeading).not.toHaveClass("text-white")

        // Change active container
        fireEvent.click(doneHeading)

        // Check that Done is active and New Questions is not:
        // Check that New Questions is not active
        const updatedNewQuestionsHeading = screen.getByRole("heading", {
            name: /new questions/i,
        })
        expect(updatedNewQuestionsHeading).not.toHaveClass("bg-blue-950")
        expect(updatedNewQuestionsHeading).not.toHaveClass("text-white")
        expect(screen.getAllByRole("button", { name: /show/i }).length).toBe(4)

        // Check that Done is active
        const updatedDoneHeading = screen.getByRole("heading", {
            name: /done/i,
        })
        expect(updatedDoneHeading).toHaveClass("bg-blue-950")
        expect(updatedDoneHeading).toHaveClass("text-white")
    })

    it("will navigate to poll details when button show is clicked", async () => {
        const history = createMemoryHistory()
        const qId = "xj352vofupe1dqz9emx13r"
        renderWithProviders(
            <Router location={history.location} navigator={history}>
                <PollsDashboard />
            </Router>,
            {
                preloadedState: initialData,
            }
        )

        const showButtons = screen.getAllByRole("button", { name: /show/i })
        await fireEvent.click(showButtons[0])

        await waitFor(() => {
            expect(history.location.pathname).toBe(`/poll/${qId}`)
        })
    })

    it("will move poll to done after voted", async () => {
        const clonedData = _.cloneDeep(initialData)
        const qId = "xj352vofupe1dqz9emx13r"
        const { store } = renderWithProviders(
            <MemoryRouter>
                <PollsDashboard />
            </MemoryRouter>,
            {
                preloadedState: clonedData,
            }
        )

        // Check that question is in "New Question"
        const pollLinks = screen.getAllByRole("link")
        expect(pollLinks[0].getAttribute("href")?.includes(qId)).toBe(true)

        const answer = { qId, answer: "optionOne" }
        await store.dispatch(handleVoteQuestion(answer))

        // Check that question is not in "New Questions"
        expect(
            screen.getAllByRole("link")[0].getAttribute("href")?.includes(qId)
        ).toBe(false)

        // Change active container to "Done"
        fireEvent.click(
            screen.getByRole("heading", {
                name: /done/i,
            })
        )

        // Check that question is nin "Done"
        expect(screen.getAllByRole("link")[0].getAttribute("href")?.includes(qId)).toBe(true)
    })
})

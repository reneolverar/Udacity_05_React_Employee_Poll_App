import * as React from "react"
import { screen, configure } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import { getInitialData } from "../../utils/api"
import PollsDashboard from "../PollsDashboard"
import App from "../../App"

let initialData
beforeAll(async () => (initialData = await getInitialData()))

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    //  const incrementControl = screen.getByText('Increment', { suggest: true })
})

describe("PollsDashboard", () => {
    it("will match the snapshot", async () => {
        renderWithProviders(<PollsDashboard />, {
            preloadedState: initialData,
        })
        expect(screen).toMatchSnapshot()
    })

    it("will have all expected fields", () => {
        renderWithProviders(<PollsDashboard />, {
            preloadedState: initialData,
        })

        const newQuestionsContainer = screen.getByRole("heading", {
            name: /new questions/i,
        })
        expect(newQuestionsContainer).toBeInTheDocument()

        const doneContainer = screen.getByRole("heading", { name: /done/i })
        expect(doneContainer).toBeInTheDocument()

        const showButtons = screen.getAllByRole("button", { name: /show/i })
        expect(showButtons.length).toBe(6)
    })

    it("will show poll details when button show is clicked", async () => {
        const { user } = renderWithProviders(<App />, {
            preloadedState: initialData,
        })
        const homeContainer = await screen.findByRole("heading", {
            name: /new questions/i,
        })

        const showButtons = screen.getAllByRole("button", { name: /show/i })
        user.click(showButtons[0])

        const pollDetailsTitle = await screen.findByRole("heading", {
            name: /Poll by tyler mcginnis/i,
        })

    })
})

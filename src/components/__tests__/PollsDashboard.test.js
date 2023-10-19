import { screen, configure } from "@testing-library/react"
import { logIn } from "../../App.test"

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    //  const incrementControl = screen.getByText('Increment', { suggest: true })
})

describe("PollsDashboard", () => {
    it("will match the snapshot", async () => {
        await logIn()
        expect(screen).toMatchSnapshot()
    })

    it("will have all expected fields", async () => {

        await logIn()

        const newQuestionsContainer = await screen.findByRole("heading", {
            name: /new questions/i,
        })
        expect(newQuestionsContainer).toBeInTheDocument()

        const doneContainer = screen.getByRole("heading", { name: /done/i })
        expect(doneContainer).toBeInTheDocument()

        const showButtons = screen.getAllByRole("button", { name: /show/i })
        expect(showButtons.length).toBe(6)
    })

    it("will show poll details when button show is clicked", async () => {
        const {user, store} = await logIn()

        const showButtons = screen.getAllByRole("button", { name: /show/i })
        user.click(showButtons[0])

        const authedUser = store.getState().authedUser

        const pollDetailsTitle = await screen.findByRole("heading", {
            name: /Poll by/i,
        })

        expect(pollDetailsTitle).toBeInTheDocument()
    })
})

import {
    screen,
    configure,
    logRoles,
    waitFor,
    fireEvent,
} from "@testing-library/react"
import { initialData, renderWithProviders } from "../../utils/test-utils"
import { createMemoryHistory } from "history"
import { MemoryRouter, Router } from "react-router-dom"
import CreatePoll from "../CreatePoll"
import userEvent from "@testing-library/user-event"

const getPageElements = () => {
    const optionOneInput = screen.getByRole("textbox", {
        name: /First Option/i,
    })
    const optionTwoInput = screen.getByRole("textbox", {
        name: /Second Option/i,
    })
    const submitButton = screen.getByRole("button", { name: /submit/i })
    return { optionOneInput, optionTwoInput, submitButton }
}

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
})

describe("CreatePoll", () => {
    it("will match the snapshot", async () => {
        renderWithProviders(
            <MemoryRouter>
                <CreatePoll />
            </MemoryRouter>,
            {
                preloadedState: initialData,
            }
        )
        expect(screen).toMatchSnapshot()
    })

    it("will have all expected fields", async () => {
        renderWithProviders(
            <MemoryRouter>
                <CreatePoll />
            </MemoryRouter>,
            {
                preloadedState: initialData,
            }
        )
        const { optionOneInput, optionTwoInput, submitButton } =
            getPageElements()

        const options = screen.getAllByRole("textbox", { name: /Option/i })
        expect(options.length).toEqual(2)

        expect(screen.getByText(/create your own poll/i)).toBeInTheDocument()
        expect(
            screen.getByText(/\*please fill out all required fields/i)
        ).toBeInTheDocument()

        expect(optionOneInput).toBeInTheDocument()
        expect(optionTwoInput).toBeInTheDocument()

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeDisabled()
    })

    it("will not submit if required fields empty", async () => {
        const user = userEvent.setup()
        renderWithProviders(
            <MemoryRouter>
                <CreatePoll />
            </MemoryRouter>,
            {
                preloadedState: initialData,
            }
        )
        const { optionOneInput, optionTwoInput, submitButton } =
            getPageElements()

        await user.type(optionOneInput, "Test 1")
        expect(optionOneInput).toHaveValue("Test 1")
        expect(submitButton).toBeDisabled()

        await user.clear(optionOneInput)
        await user.type(optionTwoInput, "Test 2")
        expect(optionTwoInput).toHaveValue("Test 2")
        expect(submitButton).toBeDisabled()

        await user.type(optionOneInput, "Test 1")

        expect(submitButton).not.toBeDisabled()
    })

    it("will not submit if required fields have same text", async () => {
        const user = userEvent.setup()
        renderWithProviders(
            <MemoryRouter>
                <CreatePoll />
            </MemoryRouter>,
            {
                preloadedState: initialData,
            }
        )
        const { optionOneInput, optionTwoInput, submitButton } =
            getPageElements()

        await user.type(optionOneInput, "Test")
        await user.type(optionTwoInput, "Test")

        expect(
            screen.queryByText(/\*please fill out all required fields/i)
        ).not.toBeInTheDocument()

        expect(submitButton).toBeDisabled()

        expect(
            screen.getByText(/\*Options text should be different/i)
        ).toBeInTheDocument()

        await user.type(optionOneInput, "Test 1")

        expect(submitButton).not.toBeDisabled()
    })

    it("will not submit if texts longer than 140 chars", async () => {
        const user = userEvent.setup()
        renderWithProviders(
            <MemoryRouter>
                <CreatePoll />
            </MemoryRouter>,
            {
                preloadedState: initialData,
            }
        )
        const { optionOneInput, optionTwoInput, submitButton } =
            getPageElements()

        await user.type(optionOneInput, "Test")
        await user.type(optionTwoInput, "a".repeat(141))

        expect(
            screen.queryByText(/\*please fill out all required fields/i)
        ).not.toBeInTheDocument()

        expect(submitButton).toBeDisabled()
        expect(
            screen.getByText(/\*Keep your texts short! Less than 140 characters/i)
        ).toBeInTheDocument()

        await user.clear(optionTwoInput)
        await user.type(optionTwoInput, "Test 2")
        expect(submitButton).not.toBeDisabled()
    })

    it("will create a poll and navigate to dashboard when submitted", async () => {
        const history = createMemoryHistory()
        const user = userEvent.setup()
        const { store } = renderWithProviders(
            <Router location={history.location} navigator={history}>
                <CreatePoll />
                {/* <App /> */}
            </Router>,
            {
                preloadedState: initialData,
            }
        )

        // await user.click(screen.getByRole("link", {
        //     name: /new/i,
        // }))
        // await screen.findByRole("heading", { name: /would you rather/i })

        // redirect("/add")
        // console.log(history.location);
        // logRoles(container)
        const { optionOneInput, optionTwoInput } = getPageElements()
        const optionOneText = "CreatePoll.test 1"
        const optionTwoText = "CreatePoll.test 2"
        await user.type(optionOneInput, optionOneText)
        await user.type(optionTwoInput, optionTwoText)

        expect(store.getState().users.byId["sarahedo"].questions.length).toBe(2)

        await fireEvent.click(screen.getByRole("button", { name: /submit/i }))

        // await screen.findByRole("heading", { name: /new questions/i })

        await waitFor(() => {
            expect(history.location.pathname).toBe("/")
        })

        // store.subscribe()
        // await waitFor(() => {
        //     expect(store.getState().users.byId["sarahedo"].questions.length).toBe(3)
        // })

        // console.log(store.getState().questions.allIds.length)
        // screen.debug()

        // This should, the button in my application creates the new question and navigates to the dashboard
        // const newQuestionsContainer = await screen.findByRole("heading", {
        //     name: /new questions/i,
        // })
    })
})

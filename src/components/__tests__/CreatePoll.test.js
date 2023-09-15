import * as React from "react"
import { screen, configure } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import CreatePoll from "../CreatePoll"
import { getInitialData } from "../../utils/api"
import App from "../../App"
import { act } from "react-dom/test-utils"

let initialData
beforeAll(async () => (initialData = await getInitialData()))

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    //  const incrementControl = screen.getByText('Increment', { suggest: true })
})

describe("CreatePoll", () => {
    it("will match the snapshot", () => {
        renderWithProviders(<CreatePoll />)
        expect(screen).toMatchSnapshot()
    })

    it("will have all expected fields", () => {
        renderWithProviders(<CreatePoll />)

        const options = screen.getAllByRole("textbox", { name: /Option/i })
        expect(options.length).toEqual(2)

        const optionOneInput = screen.getByRole("textbox", {
            name: /First Option/i,
        })
        const optionTwoInput = screen.getByRole("textbox", {
            name: /Second Option/i,
        })
        expect(optionOneInput).toBeInTheDocument()
        expect(optionTwoInput).toBeInTheDocument()

        const submitButton = screen.getByRole("button", { name: /submit/i })
        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeDisabled()
    })

    it("will not submit if required fields empty", async () => {
        const { user } = renderWithProviders(<App />, {
            preloadedState: initialData,
        })
        const newPollLink = await screen.findByRole("link", {
            name: /new/i,
        })
        user.click(newPollLink)
        const optionOneInput = await screen.findByRole("textbox", {
            name: /First Option/i,
        })
        const optionTwoInput = screen.getByRole("textbox", {
            name: /Second Option/i,
        })
        const submitButton = screen.getByRole("button", { name: /submit/i })

        // await user.type(optionOneInput, "Test 1")
        await act(() => user.type(optionOneInput, "Test 1"))
        expect(optionOneInput).toHaveValue("Test 1")
        expect(submitButton).toBeDisabled()

        // await user.clear(optionOneInput)
        await act(() => user.clear(optionOneInput))
        // await user.type(optionTwoInput, "Test 2")
        await act(() => user.type(optionTwoInput, "Test 2"))
        expect(optionTwoInput).toHaveValue("Test 2")
        expect(submitButton).toBeDisabled()
    })
})

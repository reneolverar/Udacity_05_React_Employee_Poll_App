import { screen, configure, logRoles } from "@testing-library/react"
import { logIn } from "../../App.test"

const goToCreatePoll = async (user) => {
    const newPollLink = await screen.findByRole("link", {
        name: /new/i,
    })
    user.click(newPollLink)
    const optionOneInput = await screen.findByRole("textbox", {
        name: /First Option/i,
    })
    expect(optionOneInput).toBeInTheDocument()
}

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

export const fillOutPoll = async (user, text1, text2) => {
    const { optionOneInput, optionTwoInput } = getPageElements()
    await user.type(optionOneInput, text1)
    await user.type(optionTwoInput, text2)
}

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
})

describe("CreatePoll", () => {
    it("will match the snapshot", async () => {
        const { user } = await logIn()
        await goToCreatePoll(user)
        expect(screen).toMatchSnapshot()
    })

    it("will have all expected fields", async () => {
        const { user } = await logIn()
        await goToCreatePoll(user)
        const { optionOneInput, optionTwoInput, submitButton } =
            getPageElements()

        const options = screen.getAllByRole("textbox", { name: /Option/i })
        expect(options.length).toEqual(2)

        expect(optionOneInput).toBeInTheDocument()
        expect(optionTwoInput).toBeInTheDocument()

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeDisabled()
    })

    it("will not submit if required fields empty", async () => {
        const { user } = await logIn()
        await goToCreatePoll(user)
        const { optionOneInput, optionTwoInput, submitButton } =
            getPageElements()

        // await act(() => user.type(optionOneInput, "Test 1"))
        await user.type(optionOneInput, "Test 1")
        expect(optionOneInput).toHaveValue("Test 1")
        expect(submitButton).toBeDisabled()

        // await act(() => user.clear(optionOneInput))
        await user.clear(optionOneInput)
        // await act(() => user.type(optionTwoInput, "Test 2"))
        await user.type(optionTwoInput, "Test 2")
        expect(optionTwoInput).toHaveValue("Test 2")
        expect(submitButton).toBeDisabled()

        // await act(() => user.type(optionOneInput, "Test 1"))
        await user.type(optionOneInput, "Test 1")

        expect(submitButton).not.toBeDisabled()
    })

    it("will be shown in the dashboard when submitted", async () => {
        const { user, store, container } = await logIn()
        console.log(store.getState().questions.allIds.length)
        screen.debug()
        await goToCreatePoll(user)
        // logRoles(container)

        const option1 = "Opt 1"
        const option2 = "Opt 2"
        await fillOutPoll(user, option1, option2)

        const submitButtonx = screen.getByRole("button", { name: /submit/i })
        expect(submitButtonx).not.toBeDisabled()

        await user.click(submitButtonx)

        screen.debug()

        const newQuestionsContainer = await screen.findByRole("heading", {
            name: /new questions/i,
        })
        // const selectUserTag = await screen.findByRole("heading", {
        //     name: /select user/i,
        // })

        console.log(store.getState().questions.allIds.length)
    })
})

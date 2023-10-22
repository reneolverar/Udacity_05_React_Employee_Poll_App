import { screen, configure, logRoles, waitFor } from "@testing-library/react"
import { logIn } from "../../utils/test-utils"
import { createBrowserHistory } from "history"

const goToDetails = async (user) => {
    // await screen.findByRole("heading", {
    //         name: /new questions/i,
    //     })
    const showButtons = screen.getAllByRole("button", {
        name: /show/i,
    })
    const showButton = showButtons[0]
    user.click(showButton)
    const pollDetailsTitle = await screen.findByRole("heading", {
        name: /Poll by/i,
    })
    expect(pollDetailsTitle).toBeInTheDocument()
}

const getVoteDetails = (store) => {
    const qIdEl = screen.getByTestId("location-display", { suggest: false })
    const qId = qIdEl.textContent.substring(6)
    const question = store.getState().questions.byId[qId]
    const q1Text = question.optionOne.text
    const q2Text = question.optionTwo.text
    const buttons = screen.getAllByRole("button", { name: /click/i })
    const q1Btn = buttons[0]
    const q2Btn = buttons[0]
    console.log(question, q1Text, q2Text)
    return { question, qId, q1Text, q2Text, q1Btn, q2Btn }
}

const voteQuestion = async (store, user, q = 0) => {
    const { q1Btn, q2Btn } = getVoteDetails(store)
    user.click(q === 0 ? q1Btn : q2Btn)
    const thanksMsg = await screen.findByText(/thank you for voting!/i)
    expect(thanksMsg).toBeInTheDocument()
}

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
})

describe("PollDetails", () => {
    it("will match the snapshot", async () => {
        const { user } = await logIn()
        await goToDetails(user)
        expect(screen).toMatchSnapshot()
    })

    it("will have all expected fields", async () => {
        const { user, store } = await logIn()
        await goToDetails(user)

        const title = screen.getByRole("heading", {
            name: /poll by mike tsamis/i,
        })
        expect(title).toBeInTheDocument()

        const author = screen.getByRole("heading", {
            name: /@mtsamis/i,
        })
        expect(author).toBeInTheDocument()

        const avatar = screen.getByRole("img", {
            name: /app logo instead of avatar/i,
        })
        expect(avatar).toBeInTheDocument()

        const wouldYouRather = screen.getByRole("heading", {
            name: /would you rather:/i,
        })
        expect(wouldYouRather).toBeInTheDocument()

        const { q1Text, q2Text, q1Btn, q2Btn } = getVoteDetails(store)

        // Find option 1 and option 2 in the document
        expect(screen.getByText(q1Text)).toBeInTheDocument()
        expect(screen.getByText(q2Text)).toBeInTheDocument()

        expect(q1Btn).toBeInTheDocument()
        expect(q2Btn).toBeInTheDocument()
    })

    it("will vote if not yet voted", async () => {
        const { user, store } = await logIn()
        await goToDetails(user)

        const { question, qId, q1Btn, q2Btn } = getVoteDetails(store)

        expect(q1Btn).not.toBeDisabled()
        expect(q2Btn).not.toBeDisabled()

        expect(question.optionOne.votes.length).toBe(2)

        await voteQuestion(store, user)

        const thanksMsg = await screen.findByText(/thank you for voting!/i)
        expect(thanksMsg).toBeInTheDocument()

        expect(q1Btn).toBeDisabled()
        expect(q2Btn).toBeDisabled()

        const updatedQuestion = store.getState().questions.byId[qId]
        expect(updatedQuestion.optionOne.votes.length).toBe(3)

        const numVotesText = screen.getByText(
            /option one has 3 votes \(0\.75%\)/i
        )
        expect(numVotesText).toBeInTheDocument()
    })

    it("will be marked done in dashboard after voting", async () => {
        let history = createBrowserHistory()
        const { user, store, container } = await logIn(history)
        await goToDetails(user)

        const { qId } = getVoteDetails(store)
        await waitFor(() => {
            expect(history.location.pathname).toBe("/poll/" + qId)
        })

        await voteQuestion(store, user)

        const homeLink = screen.getByRole("link", {
            name: /home/i,
        })
        user.click(homeLink)

        await waitFor(() => {
            expect(history.location.pathname).toBe("/")
        })

        // screen.debug()
        // logRoles(container)

        // This test should pass
        // await screen.findByRole("heading", {
        //     name: /new questions/i,
        // })
    })
})

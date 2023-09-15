import { screen, configure } from "@testing-library/react"
import { renderWithProviders } from "./utils/test-utils"
import App from "./App"
import { handleInitialData } from "./actions/shared"
import { getInitialData } from "./utils/api"
import PollsDashboard from "./components/PollsDashboard"
import Leaderboard from "./components/Leaderboard"

let initialData
beforeAll(async () => (initialData = await getInitialData()))

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    //  const incrementControl = screen.getByText('Increment', { suggest: true })
})

describe("App", () => {
    it("will match the snapshot", () => {
        renderWithProviders(<App />)
        expect(screen).toMatchSnapshot()
    })

    it("will receive the authed user", async () => {
        const { store } = renderWithProviders(<App />)
        expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument()
        await store.dispatch(handleInitialData())
        expect(
            screen.queryByRole("link", { name: /login/i })
        ).not.toBeInTheDocument()
    })

    it("will navigate to all links", async () => {
        const { store, user } = renderWithProviders(<App />, {
            preloadedState: initialData,
        })

        let homeContainer, leaderboardContainer, newPollContainer
        const homeRole = ["heading", { name: /new questions/i }]
        const leaderboardRole = ["heading", { name: /leaderboard/i }]
        const newPollRole = ["heading", { name: /would you rather/i }]

        const homeLink = screen.getByRole("link", {
            name: /home/i,
        })
        const leaderboardLink = screen.getByRole("link", {
            name: /leaderboard/i,
        })
        const newPollLink = screen.getByRole("link", {
            name: /new/i,
        })

        homeContainer = await screen.findByRole(...homeRole)
        expect(homeContainer).toBeInTheDocument()

        user.click(leaderboardLink)
        leaderboardContainer = await screen.findByRole(...leaderboardRole)
        expect(leaderboardContainer).toBeInTheDocument()
        expect(homeContainer).not.toBeInTheDocument()

        user.click(newPollLink)
        newPollContainer = await screen.findByRole(...newPollRole)
        expect(newPollContainer).toBeInTheDocument()
        expect(leaderboardContainer).not.toBeInTheDocument()

        user.click(homeLink)
        homeContainer = await screen.findByRole(...homeRole)
        expect(homeContainer).toBeInTheDocument()
        expect(newPollContainer).not.toBeInTheDocument()
    })
})

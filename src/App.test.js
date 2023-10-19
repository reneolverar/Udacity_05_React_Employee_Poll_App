import { screen, configure } from "@testing-library/react"
import { renderWithProviders } from "./utils/test-utils"
import App from "./App"
import { getInitialData } from "./utils/api"

export const logIn = async () => {
    const initialData = await getInitialData()
    const { user, store, container } = renderWithProviders(<App />, {
        preloadedState: initialData,
    })
    const firstUser = await screen.findByRole("button", { name: /sarahedo/i })
    user.click(firstUser)
    const userLoggedIn = await screen.findByText(/@sarahedo/i)
    expect(userLoggedIn).toBeInTheDocument()
    return { user, store, container }
}

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    //  const incrementControl = screen.getByText('Increment', { suggest: true })
})

describe("App", () => {
    it("will match the snapshot", async () => {
        await logIn()
        expect(screen).toMatchSnapshot()
    })

    it("will navigate to all links", async () => {
        const { user } = await logIn()

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
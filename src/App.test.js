import { screen, configure } from "@testing-library/react"
import { logIn } from "./utils/test-utils"

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    //  const incrementControl = screen.getByText('Increment', { suggest: true })
})

describe("App", () => {
    it("will match the login snapshot", async () => {
        expect(screen).toMatchSnapshot()
    })

    it("will match the logged in snapshot", async () => {
        await logIn()
        expect(screen).toMatchSnapshot()
    })

    it("will log out", async () => {
        const { user } = await logIn()
        const userMenu = screen.getByRole("button", {
            name: /open user menu/i,
        })
        user.click(userMenu)
        const logOutButton = await screen.findByRole('menuitem', { name: /log out/i })
        user.click(logOutButton)
        const selectUser = await screen.findByRole('heading', { name: /select user/i })
        expect(selectUser).toBeInTheDocument()
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

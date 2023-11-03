import { screen, configure } from "@testing-library/react"
import { initialData, renderWithProviders } from "./utils/test-utils"
import { MemoryRouter } from "react-router-dom"
import App from "./App"
import userEvent from "@testing-library/user-event"

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    //  const incrementControl = screen.getByText('Increment', { suggest: true })
})

describe("App", () => {
    it("will match the login snapshot", async () => {
        renderWithProviders(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
            {
                preloadedState: {
                    ...initialData,
                    authedUser: {
                        value: null
                    }
                }
            }
        )
        expect(
            screen.getByRole("heading", {
                name: /select user/i,
            })
        ).toBeInTheDocument()
        expect(screen).toMatchSnapshot()
    })

    it("will match the logged in snapshot", async () => {
        renderWithProviders(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
            {
                preloadedState: initialData,
            }
        )
        expect(
            screen.queryByRole("heading", {
                name: /select user/i,
            })
        ).not.toBeInTheDocument()
        expect(screen).toMatchSnapshot()
    })

    it("will log in", async () => {
        const user = userEvent.setup()
        renderWithProviders(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
            {
                preloadedState: {
                    ...initialData,
                    authedUser: {
                        value: null
                    }
                }
            }
        )
        await user.click(screen.getByRole("button", { name: /sarahedo/i }))
        expect(
            screen.queryByRole("heading", {
                name: /select user/i,
            })
        ).not.toBeInTheDocument()
        expect(screen.getByText(/@sarahedo/i)).toBeInTheDocument()
    })

    it("will log out", async () => {
        const user = userEvent.setup()
        renderWithProviders(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
            {
                preloadedState: initialData,
            }
        )
        expect(
            screen.queryByRole("heading", {
                name: /select user/i,
            })
        ).not.toBeInTheDocument()

        const userMenu = screen.getByRole("button", {
            name: /open user menu/i,
        })
        await user.click(userMenu)
        const logOutButton = await screen.findByRole("menuitem", {
            name: /log out/i,
        })
        await user.click(logOutButton)
        expect(
            await screen.findByRole("heading", {
                name: /select user/i,
            })
        ).toBeInTheDocument()
    })

    it("will navigate to all links", async () => {
        const user = userEvent.setup()
        renderWithProviders(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
            {
                preloadedState: initialData,
            }
        )

        let homeContainer, leaderboardContainer, newPollContainer
        const homeRole: [string, {name: RegExp}] = ["heading", { name: /new questions/i }]
        const leaderboardRole: [string, {name: RegExp}]  = ["heading", { name: /leaderboard/i }]
        const newPollRole: [string, {name: RegExp}]  = ["heading", { name: /would you rather/i }]

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

        await user.click(leaderboardLink)
        leaderboardContainer = await screen.findByRole(...leaderboardRole)
        expect(leaderboardContainer).toBeInTheDocument()
        expect(homeContainer).not.toBeInTheDocument()

        await user.click(newPollLink)
        newPollContainer = await screen.findByRole(...newPollRole)
        expect(newPollContainer).toBeInTheDocument()
        expect(leaderboardContainer).not.toBeInTheDocument()

        await user.click(homeLink)
        homeContainer = await screen.findByRole(...homeRole)
        expect(homeContainer).toBeInTheDocument()
        expect(newPollContainer).not.toBeInTheDocument()
    })
})

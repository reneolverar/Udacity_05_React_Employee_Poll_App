import { screen, configure } from "@testing-library/react"
import { logIn } from "../../utils/test-utils"

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    //  const incrementControl = screen.getByText('Increment', { suggest: true })
})

describe("Leaderboard", () => {
    it("will match the snapshot", async () => {
        const { user } = await logIn()
        const leaderboardLink = screen.getByRole("link", {
            name: /leaderboard/i,
        })
        user.click(leaderboardLink)
        const leaderboardContainer = await screen.findByRole("heading", {
            name: /leaderboard/i,
        })
        expect(leaderboardContainer).toBeInTheDocument()
        expect(screen).toMatchSnapshot()
    })

    it("will have all expected fields", async () => {
        const { user } = await logIn()
        const leaderboardLink = screen.getByRole("link", {
            name: /leaderboard/i,
        })
        user.click(leaderboardLink)

        const leaderBoardContainer = await screen.findByRole("heading", {
            name: /leaderboard/i,
        })
        expect(leaderBoardContainer).toBeInTheDocument()

        expect(
            screen.getByRole("row", { name: /Sarah Edo sarahedo 4 2/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole("row", { name: /Mike Tsamis mtsamis 3 2/i })
        ).toBeInTheDocument()
    })
})

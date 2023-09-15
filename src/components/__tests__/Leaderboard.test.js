import * as React from "react"
import { screen, configure } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import { getInitialData } from "../../utils/api"

import Leaderboard from "../Leaderboard"

let initialData
beforeAll(async () => (initialData = await getInitialData()))

beforeEach(() => {
    configure({
        throwSuggestions: true,
    })
    //  const incrementControl = screen.getByText('Increment', { suggest: true })
})

describe("Leaderboard", () => {
    it("will match the snapshot", () => {
        renderWithProviders(<Leaderboard />, {
            preloadedState: initialData,
        })
        expect(screen).toMatchSnapshot()
    })

    it("will have all expected fields", () => {
        renderWithProviders(<Leaderboard />, {
            preloadedState: initialData,
        })

        const leaderBoardContainer = screen.getByRole("heading", {
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

import React from "react"
import { render, screen } from "@testing-library/react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
// As a basic setup, import your same slice reducers
// import userReducer from '../features/users/userSlice'
import reducer from "../reducers"
import thunk from "redux-thunk"
import logger from "../middleware/logger"
import { getInitialData } from "./api"
import App from "../App"
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';



export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        // store = configureStore({ reducer: { user: userReducer }, preloadedState }),
        store = configureStore({
            reducer,
            middleware: [thunk, logger],
            preloadedState,
        }),
        // route = "/",
        history,
        ...renderOptions
    } = {}
) {

    function Wrapper({ children }) {

        return (
            <Provider store={store}>
                {/* <MemoryRouter>{children}</MemoryRouter> */}
                <HistoryRouter history={history}>{children}</HistoryRouter>
            </Provider>
        )
    }

    // window.history.pushState({}, "Test page", route)

    // Return an object with the store and all of RTL's query functions
    return {
        history,
        store,
        user: userEvent.setup(),
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    }
}

export const logIn = async () => {
    const history = createBrowserHistory()
    const initialData = await getInitialData()
    const view = renderWithProviders(<App />, {
        preloadedState: initialData,
        history: history,
    })
    const firstUser = await screen.findByRole("button", { name: /sarahedo/i })
    view.user.click(firstUser)
    const userLoggedIn = await screen.findByText(/@sarahedo/i)
    expect(userLoggedIn).toBeInTheDocument()
    return view
}

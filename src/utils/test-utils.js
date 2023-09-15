import React from "react"
import { render } from "@testing-library/react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
// As a basic setup, import your same slice reducers
// import userReducer from '../features/users/userSlice'
import reducer from "../reducers"
import thunk from "redux-thunk"
import logger from "../middleware/logger"

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
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return (
            <MemoryRouter>
                <Provider store={store}>{children}</Provider>
            </MemoryRouter>
        )
    }

    // window.history.pushState({}, "Test page", route)

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        user: userEvent.setup(),
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    }
}

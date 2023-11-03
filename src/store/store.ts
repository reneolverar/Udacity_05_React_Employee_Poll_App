import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authedUserReducer from "./authedUserSlice"
import questionsReducer from "./questionSlice"
import usersReducer from "./usersSlice"
import { loadingBarReducer } from "react-redux-loading-bar"
import logger from "../middleware/logger"

export const rootReducer = combineReducers({
    authedUser: authedUserReducer,
    questions: questionsReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom"
import React, { ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import { handleInitialData } from "./store/sharedActions"
import Nav from "./components/Nav"
import PollsDashboard from "./components/PollsDashboard"
import Leaderboard from "./components/Leaderboard"
import LogIn from "./components/LogIn"
import NewPoll from "./components/CreatePoll"
import PollDetails from "./components/PollDetails"
import PageNotFound from "./components/PageNotFound"
import LoadingBar from "react-redux-loading-bar"
import RequireAuth from "./utils/RequireAuth"

export default function App() {
    const users = useAppSelector((state) => state.users)
    let loading: boolean = Object.entries(users).length === 0;
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(handleInitialData())
    }, [])

    // Protect route
    const protectRote = (children: ReactNode) => <RequireAuth>{children}</RequireAuth>

    return (
        <div className="App">
            <Nav></Nav>
            <LoadingBar />
            {loading === true ? null : (
                <Routes>
                    <Route
                        path="/"
                        element={protectRote(<PollsDashboard />)}
                    />
                    <Route
                        path="/Udacity_05_React_Employee_Poll_App"
                        element={<Navigate to="/" />}
                    />
                    <Route
                        path="/leaderboard"
                        element={protectRote(<Leaderboard />)}
                    />
                    <Route
                        path="/add"
                        element={protectRote(<NewPoll />)}
                    />
                    <Route
                        path="/poll/:id"
                        element={protectRote(<PollDetails />)}
                    />
                    <Route
                        path="/login"
                        element={<LogIn />}
                    />
                    <Route
                        path="/pageNotFound"
                        element={<PageNotFound />}
                    />
                    <Route
                        path="/pageNotFound/:error"
                        element={<PageNotFound />}
                    />
                    <Route
                        path="/*"
                        element={<Navigate to="/pageNotFound" />}
                    />
                </Routes>
            )}
        </div>
    )
}

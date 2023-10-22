import "./App.css"

import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { connect } from "react-redux"
import { handleInitialData } from "./actions/shared"

import Nav from "./components/Nav"
import PollsDashboard from "./components/PollsDashboard"
import Leaderboard from "./components/Leaderboard"
import LogIn from "./components/LogIn"
import NewPoll from "./components/CreatePoll"
import PollDetails from "./components/PollDetails"
import PageNotFound from "./components/PageNotFound"
import LoadingBar from "react-redux-loading-bar"

function App(props) {
    useEffect(() => {
        props.dispatch(handleInitialData())
    }, [])

    return (
        <div className="App">
            <Nav></Nav>
            <LoadingBar />
            {props.loading === true ? null : (
                <Routes>
                    {props.authedUser === null ? (
                        <Route
                            path="*"
                            element={<LogIn />}
                        />
                    ) : (
                        <>
                            <Route
                                exact
                                path="/"
                                element={<PollsDashboard />}
                            />
                            <Route
                                exact
                                path="/dashboard"
                                element={<PollsDashboard />}
                            />
                            <Route
                                exact
                                path="/leaderboard"
                                element={<Leaderboard />}
                            />
                            <Route
                                exact
                                path="/add"
                                element={<NewPoll />}
                            />
                            <Route
                                exact
                                path="/poll/:id"
                                element={<PollDetails />}
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
                        </>
                    )}
                </Routes>
            )}
        </div>
    )
}

const mapStateToProps = ({ users, authedUser }) => ({
    loading: users === null,
    authedUser,
})

export default connect(mapStateToProps)(App)

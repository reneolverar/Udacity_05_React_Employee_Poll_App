import "./App.css"

import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { connect } from "react-redux"
import { handleInitialData } from "./actions/shared"

import Nav from "./components/Nav"
import PollsDashboard from "./components/PollsDashboard"
import Leaderboard from "./components/Leaderboard"
import LogIn from "./components/LogIn"
import NewPoll from "./components/CreatePoll"
import PollDetails from "./components/PollDetails"
import LoadingBar from "react-redux-loading-bar";

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
                    <Route
                        path="/"
                        element={<PollsDashboard />}
                    />
                    <Route
                        // index
                        path="/leaderboard"
                        element={<Leaderboard />}
                    />
                    <Route
                        path="/login"
                        element={<LogIn />}
                    />
                    <Route
                        path="/newpoll"
                        element={<NewPoll />}
                    />
                    <Route
                        exact path="/poll/:id"
                        element={<PollDetails />}
                    />
                </Routes>
            )}
        </div>
    )
}

const mapStateToProps = ({ authedUser }) => ({
    loading: authedUser === null,
})

export default connect(mapStateToProps)(App)

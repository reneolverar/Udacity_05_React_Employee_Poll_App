import "./App.css"

import { Routes, Route } from "react-router-dom"

import Nav from "./components/Nav"
import PollsDashboard from "./components/PollsDashboard"
import Leaderboard from "./components/Leaderboard"
import LogIn from "./components/LogIn"
import NewPoll from "./components/CreatePoll"
import Poll from "./components/Poll"

function App() {
    return (
        <div className="App">
            <Nav></Nav>
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
                    path="/poll"
                    element={<Poll />}
                />
            </Routes>
        </div>
    )
}

export default App

import "./App.css"

import { Routes, Route } from "react-router-dom"

import Nav from "./components/Nav"

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

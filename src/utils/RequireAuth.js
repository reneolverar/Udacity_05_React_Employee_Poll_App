import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

export default function RequireAuth({ children }) {
    const authedUser = useSelector((state) => state.authedUser)
    // We need to save the route the user tried to access before directing
    // him to login if not authenticated
    const location = useLocation()
    return authedUser ? (
        children
    ) : (
        <Navigate
            to="/login"
            replace
            state={{
                path: location.pathname,
            }}
        />
    )
}

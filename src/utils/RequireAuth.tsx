import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "../store/hooks"
import { ReactNode } from "react";

export default function RequireAuth({children} : {children: ReactNode}) {
    const authedUser = useAppSelector((state) => state.authedUser.value)
    console.log(authedUser);
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

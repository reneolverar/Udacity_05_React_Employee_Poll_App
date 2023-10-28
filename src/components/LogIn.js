import { useDispatch, useSelector } from "react-redux"
import logo from "../assets/employee-poll-logo.png"
import { setAuthedUser } from "../store/authedUserSlice"
import { useLocation, useNavigate } from "react-router-dom"

export default function LogIn() {
    const users = useSelector((state) => state.users)
    const dispatch = useDispatch()

    // We are using protected routes with RequireAuth.js which sets the route the user
    // wanted to access before sending him to login page
    const navigate = useNavigate()
    const { state } = useLocation()

    const handleClick = async (e) => {
        e.preventDefault()
        await dispatch(setAuthedUser(e.target.id))
        navigate(state?.path || "/")
    }
    return (
        <div className="text-center">
            <h1 className="text-4xl uppercase">Employee Polls</h1>
            <img
                className="m-auto"
                src={logo}
                alt="Poll app logo"
                width={150}
                height={150}
            />
            <h2 className="text-3xl">Log In</h2>
            <h3 className="text-xl">Select user</h3>
            {users.allIds?.map((id) => (
                <button
                    key={id}
                    id={id}
                    className="button block m-auto bt-green"
                    onClick={handleClick}
                >
                    {id}
                </button>
            ))}
            {/* <form onSubmit={handleSubmit}>
                <h2 className="text-3xl">Log In</h2>
                <h3 className="text-xl">User</h3>
                <input placeholder="User"></input>
                <h3 className="text-xl">Password</h3>
                <input placeholder="Password"></input>
                <button className="text-xl">Submit</button>
            </form> */}
        </div>
    )
}

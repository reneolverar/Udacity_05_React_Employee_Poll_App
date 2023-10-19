import { connect } from "react-redux"
import logo from "../assets/employee-poll-logo.png"
import { setAuthedUser } from "../actions/authedUser"

function LogIn(props) {
    const { dispatch } = props
    const handleClick = async (e) => {
        e.preventDefault()
        await dispatch(setAuthedUser(e.target.id))
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
            {props.users.allIds?.map((id) => (
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

const mapStateToProps = ({ authedUser, users }) => ({
    authedUser,
    users,
})

export default connect(mapStateToProps)(LogIn)

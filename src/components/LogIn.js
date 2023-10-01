export default function LogIn() {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }
    return (
        <div>
            <h1 className="text-4xl uppercase">Employee Polls</h1>
            <img
                src="employee-poll-logo.png"
                alt="Poll app logo"
            />
            <form onSubmit={handleSubmit}>
                <h2 className="text-3xl">Log In</h2>
                <h3 className="text-xl">User</h3>
                <input placeholder="User"></input>
                <h3 className="text-xl">Password</h3>
                <input placeholder="Password"></input>
                <button className="text-xl">Submit</button>
            </form>
        </div>
    )
}

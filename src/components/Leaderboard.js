import { useSelector } from "react-redux"
import { sortByAnsweredAndCreated } from "../utils/helpers"
import logo from "../assets/employee-poll-logo.png"

export default function Leaderboard() {
    const users = useSelector((state) => state.users)
    const sortedNumAnsweredIds = sortByAnsweredAndCreated(users.byId)
    return (
        <div>
            <h1 className=" text-2xl font-bold text-center">Leaderboard</h1>
            <table className="min-w-full text-left border border-neutral-500">
                <thead className="border-b border-neutral-500">
                    <tr>
                        <th>Users</th>
                        <th>Answered</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedNumAnsweredIds.map((id) => (
                        <tr
                            key={id}
                            className="border border-neutral-500"
                        >
                            <td>
                                <img
                                    src={logo}
                                    alt="Poll app logo"
                                    width={50}
                                    height={50}
                                ></img>
                                <p className="text-xl">{users.byId[id].name}</p>
                                <span>{users.byId[id].id}</span>
                            </td>
                            <td>
                                {Object.keys(users.byId[id].answers).length}
                            </td>
                            <td>{users.byId[id].questions.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

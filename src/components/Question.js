import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { formatDate } from "../utils/helpers"

export default function Question({id}) {
    const questions = useSelector((state) => state.questions)
    const { author, timestamp } = questions.byId[id]
    return (
        <div className="border border-black rounded-md text-center h-32 shadow-md hover:shadow-lg">
            <h1 className="font-bold">{author}</h1>
            <p>{formatDate(timestamp)}</p>
            <Link to={`/poll/${id}`}>
                <button className="button bt-green green my-5 ">
                    Show
                </button>
            </Link>
        </div>
    )
}

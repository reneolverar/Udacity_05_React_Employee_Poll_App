import { Link } from "react-router-dom"
import { formatDate } from "../utils/helpers"
import { useAppSelector } from "../store/hooks"

type QuestionProps = {
    id: string
}

type Questions = {
    byId: {
        questionId: {
            id: string,
            author: string,
            timestamp: number,
            optionOne: {
                votes: [],
                text: string
            }
            optionTwo: {
                votes: [],
                text: string
            }
        }
    },
    allIds: []

}

export default function Question ({id}: QuestionProps) {
    const questions = useAppSelector((state) => state.questions)
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

import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { formatDate } from "../utils/helpers"

function Question(props) {
    const { author, timestamp } = props.questions.byId[props.id]

    return (
        <div className="border border-black rounded-md text-center h-32 shadow-md hover:shadow-lg">
            <h1 className="font-bold">{author}</h1>
            <p>{formatDate(timestamp)}</p>
            <Link to={`/poll/${props.id}`}>
                <button className="button bt-green green my-5 ">
                    Show
                </button>
            </Link>
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions }) => ({
    authedUser,
    questions,
})

export default connect(mapStateToProps)(Question)

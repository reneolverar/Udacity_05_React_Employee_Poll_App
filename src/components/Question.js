import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"

function Question(props) {
    const { author, timestamp } = props.questions.byId[props.id]

    return (
        <div className="border border-black rounded-md text-center h-32 shadow-md hover:shadow-lg">
            <h1 className="font-bold">{author}</h1>
            <p>{timestamp}</p>
            <Link to={`/poll/${props.id}`}>
                <button className="button my-5 text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition ease-out duration-500">
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

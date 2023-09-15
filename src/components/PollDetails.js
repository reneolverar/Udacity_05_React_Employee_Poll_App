import { connect } from "react-redux"
import { withRouter } from "../utils/helpers"
import { handleVoteQuestion } from "../actions/questions"

function PollDetails(props) {
    const { dispatch, id, authedUser, users, questions } = props
    const question = questions.byId[id]
    const author = users.byId[question.author]

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            handleVoteQuestion({
                authedUser,
                qid: id,
                answer: e.target.name,
            })
        )
    }
    return (
        <div className="text-center">
            <h1 className="text-2xl">Poll by {author.name}</h1>
            <h2 className="text-lg text-gray-500">@{author.id}</h2>
            <img
                className="m-auto"
                src={author.avatharURL || "/employee-poll-logo.png"}
                alt={
                    author.avatharURL
                        ? `${author.name} Avatar`
                        : "App logo instead of avatar"
                }
                width={150}
                height={150}
            ></img>
            <h2 className="text-xl">Would you rather:</h2>
            <div className="flex justify-around">
                <div className="w-full px-1">
                    <textarea
                        disabled
                        value={question.optionOne.text}
                        className="border w-full h-full text-center p-1"
                    />
                    <button
                        className="block bg- bg-teal-600 text-white w-full"
                        name={"optionOne"}
                        onClick={handleClick}
                    >
                        Click
                    </button>
                </div>
                <div className=" w-full px-1">
                    <textarea
                        disabled
                        value={question.optionTwo.text}
                        className="border w-full h-full text-center p-1"
                    />
                    <button
                        className="block bg- bg-teal-600 text-white w-full"
                        name={"optionTwo"}
                        onClick={handleClick}
                    >
                        Click
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
    const { id } = props.router.params
    return {
        id,
        authedUser,
        users,
        questions,
    }
}

export default withRouter(connect(mapStateToProps)(PollDetails))

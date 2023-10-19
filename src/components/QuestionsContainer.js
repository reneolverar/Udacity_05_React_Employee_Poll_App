import { connect } from "react-redux"
import Question from "./Question"

function QuestionsContainer(props) {
    return (
        <div className="m-2 my-5">
            <h1 className="text-2xl text-center font-bold border border-black">
                {props.title}
            </h1>
            <div className="border border-black p-2 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {props.questionIds?.map((id) => (
                    <Question
                        key={id}
                        id={id}
                    ></Question>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions }) => ({
    authedUser,
    questions,
})

export default connect(mapStateToProps)(QuestionsContainer)

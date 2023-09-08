import Question from "./Question"
import { connect } from "react-redux"

function QuestionsContainer(props) {
    return (
        <div className="m-2 my-5">
            <h1 className="text-2xl text-center font-bold border border-black">
                {props.title}
            </h1>
            <div className="flex border border-black p-2 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {props.sortedQuestionIds.map((id) => (
                    <Question
                        key={id}
                        question={props.questions.byId[id]}
                    ></Question>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = ({ questions }) => ({
    questions,
    sortedQuestionIds: Object.keys(questions.byId).sort(
        (a, b) => questions.byId[b].timestamp - questions.byId[a].timestamp
    ),
})

export default connect(mapStateToProps)(QuestionsContainer)

import { connect } from "react-redux"
import QuestionsContainer from "./QuestionsContainer.js"

function PollsDashboard(props) {
    const answeredQuestionIds = props.questions.allIds.filter(
        (id) =>
            props.questions.byId[id].optionOne.votes.includes(
                props.authedUser
            ) ||
            props.questions.byId[id].optionTwo.votes.includes(props.authedUser)
    )
    const newQuestionIds = props.questions.allIds.filter(
        (id) => !answeredQuestionIds.includes(id)
    )

    const questionContainers = [
        {
            title: "New Questions",
            questionIds: answeredQuestionIds,
        },
        {
            title: "Done",
            questionIds: newQuestionIds,
        },
    ]
    return (
        <div>
            {questionContainers.map((container) => (
                <QuestionsContainer
                    key={container.title}
                    title={container.title}
                    questionIds={container.questionIds}
                ></QuestionsContainer>
            ))}
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions }) => ({
    authedUser,
    questions,
    sortedQuestionIds: Object.keys(questions.byId).sort(
        (a, b) => questions.byId[b].timestamp - questions.byId[a].timestamp
    ),
})

export default connect(mapStateToProps)(PollsDashboard)

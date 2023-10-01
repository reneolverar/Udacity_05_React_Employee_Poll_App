import { connect } from "react-redux"
import QuestionsContainer from "./QuestionsContainer.js"
import { sortObjectArray } from "../utils/helpers.js"

function PollsDashboard(props) {
    // List questionIds of already voted questions by the authedUser
    const answeredQuestionIds = props.sortedQuestionIds.filter(
        (id) =>
            props.questions.byId[id].optionOne.votes.includes(
                props.authedUser
            ) ||
            props.questions.byId[id].optionTwo.votes.includes(props.authedUser)
    )
    // List questionIds of not voted questions by the authedUser
    const newQuestionIds = props.sortedQuestionIds.filter(
        (id) => !answeredQuestionIds.includes(id)
    )

    // Create the two categories of containers, answered and open questions/polls
    const questionContainers = [
        {
            title: "New Questions",
            questionIds: newQuestionIds,
        },
        {
            title: "Done",
            questionIds: answeredQuestionIds,
        },
    ]

    return (
        <div>
            {questionContainers.map(
                (container) =>
                    container.questionIds.length > 0 && (
                        <QuestionsContainer
                            key={container.title}
                            title={container.title}
                            questionIds={container.questionIds}
                        ></QuestionsContainer>
                    )
            )}
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions }) => ({
    authedUser,
    questions,
    sortedQuestionIds: sortObjectArray(questions.byId, "timestamp"),
})

export default connect(mapStateToProps)(PollsDashboard)

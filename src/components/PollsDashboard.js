import { useSelector } from "react-redux"
import QuestionsContainer from "./QuestionsContainer.js"
import { sortByAttribute } from "../utils/helpers.js"
import { useState } from "react"

export default function PollsDashboard() {
    const authedUser = useSelector((state) => state.authedUser)
    const user = useSelector((state) => state.users.byId[authedUser])
    const questions = useSelector((state) => state.questions)
    const sortedQuestionIds = sortByAttribute(questions.byId, "timestamp")
    // List qIds of already voted questions by the authedUser
    const answeredQuestionIds = sortedQuestionIds.filter((id) =>
        Object.keys(user.answers).includes(id)
    )
    // List qIds of not voted questions by the authedUser
    const newQuestionIds = sortedQuestionIds.filter(
        (id) => !answeredQuestionIds.includes(id)
    )
    const [activeContainer, setactiveContainer] = useState(
        newQuestionIds.length > 0 ? "New Questions" : "Done"
    )

    // Create the two categories of containers, answered and open questions/polls
    const questionContainers = [
        {
            title: "New Questions",
            qIds: newQuestionIds,
        },
        {
            title: "Done",
            qIds: answeredQuestionIds,
        },
    ]

    return (
        <div>
            {questionContainers.map(
                (container) =>
                    container.qIds.length > 0 && (
                        <QuestionsContainer
                            key={container.title}
                            title={container.title}
                            qIds={container.qIds}
                            active={container.title === activeContainer}
                            onToggle={(containerTitle) =>
                                setactiveContainer(containerTitle)
                            }
                        ></QuestionsContainer>
                    )
            )}
        </div>
    )
}

import QuestionsContainer from "./QuestionsContainer"
import { sortByAttribute } from "../utils/helpers.js"
import { useState } from "react"
import { useAppSelector } from "../store/hooks"

type QuestionContainers = {
    title: "New Questions" | "Done",
    qIds: string[]
}[]

export default function PollsDashboard() {
    const authedUser = useAppSelector((state) => state.authedUser.value) as string
    console.log(authedUser);
    
    // const user = useAppSelector((state) => state.users.byId[authedUser])
    const user = useAppSelector((state) => state.users.byId[authedUser])
    const questions = useAppSelector((state) => state.questions)
    const sortedQuestionIds = sortByAttribute(questions.byId, "timestamp")
    // List qIds of already voted questions by the authedUser
    const answeredQuestionIds = sortedQuestionIds.filter((id) =>
        Object.keys(user?.answers).includes(id)
    )
    // List qIds of not voted questions by the authedUser
    const newQuestionIds = sortedQuestionIds.filter(
        (id) => !answeredQuestionIds.includes(id)
    )
    const [activeContainer, setactiveContainer] = useState<string>(
        newQuestionIds.length > 0 ? "New Questions" : "Done"
    )

    // Create the two categories of containers, answered and open questions/polls
    const questionContainers: QuestionContainers = [
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
                            onToggle={(containerTitle: string) =>
                                setactiveContainer(containerTitle)
                            }
                        ></QuestionsContainer>
                    )
            )}
        </div>
    )
}

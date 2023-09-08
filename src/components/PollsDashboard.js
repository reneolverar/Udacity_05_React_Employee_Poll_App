import { connect } from "react-redux";
import QuestionsContainer from "./QuestionsContainer.js"

const questionContainers = ["New Questions", "Done"]

export default function PollsDashboard() {
    return (
        <div>
            {questionContainers.map((container) => (
                <QuestionsContainer
                    key={container}
                    title={container}
                ></QuestionsContainer>
            ))}
        </div>
    )
}

import QuestionsContainer from "./QuestionsContainer.js"

const questionContainers = ["New Questions", "Done"]

const questions = {
    "New Questions": {
        byId: {
            q1: {
                id: "q1",
                author: "u1",
                timestamp: "01.05.2023",
                optionOne: {
                    votes: ["u1"],
                    text: "Example text",
                },
                optionTwo: {
                    votes: ["u2"],
                    text: "Example text",
                },
            },
            q2: {
                id: "q2",
                author: "u2",
                timestamp: "01.05.2023",
                optionOne: {
                    votes: ["u1"],
                    text: "Example text",
                },
                optionTwo: {
                    votes: ["u2"],
                    text: "Example text",
                },
            },
            q3: {
                id: "q3",
                author: "u3",
                timestamp: "01.05.2023",
                optionOne: {
                    votes: ["u1"],
                    text: "Example text",
                },
                optionTwo: {
                    votes: ["u2"],
                    text: "Example text",
                },
            },
            q4: {
                id: "q4",
                author: "u4",
                timestamp: "01.05.2023",
                optionOne: {
                    votes: ["u1"],
                    text: "Example text",
                },
                optionTwo: {
                    votes: ["u2"],
                    text: "Example text",
                },
            },
        },
        allIds: ["q1", "q2", "q3", "q4"],
    },
    Done: {
        byId: {
            q5: {
                id: "q5",
                author: "u1",
                timestamp: "01.05.2023",
                optionOne: {
                    votes: ["u1"],
                    text: "Example text",
                },
                optionTwo: {
                    votes: ["u2"],
                    text: "Example text",
                },
            },
            q6: {
                id: "q6",
                author: "u2",
                timestamp: "01.05.2023",
                optionOne: {
                    votes: ["u1"],
                    text: "Example text",
                },
                optionTwo: {
                    votes: ["u2"],
                    text: "Example text",
                },
            },
        },
        allIds: ["q5", "q6"],
    },
}

export default function PollsDashboard() {
    return (
        <div>
            {questionContainers.map((container) => (
                <QuestionsContainer
                    key={container}
                    title={container}
                    questions={questions[container]}
                ></QuestionsContainer>
            ))}
        </div>
    )
}

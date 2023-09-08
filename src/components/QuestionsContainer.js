import Question from "./Question"

export default function QuestionsContainer({ title, questions }) {
    return (
        <div className="m-2 my-5">
            <h1 className="text-2xl text-center font-bold border border-black">{title}</h1>
            <div className="flex border border-black p-2 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {questions.allIds.map((id) => (
                    <Question key={id} question={questions.byId[id]}></Question>
                ))}
            </div>
        </div>
    )
}

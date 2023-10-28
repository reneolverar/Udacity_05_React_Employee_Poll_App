import Question from "./Question"

export default function QuestionsContainer(props) {
    const { title, qIds, active, onToggle } = props
    return (
        <div className="m-2 my-5">
            <h1
                onClick={() => onToggle(title)}
                className={`text-blue-950 border border-blue-950 rounded-md hover:bg-blue-950 hover:text-white transition ease-out duration-500 text-2xl text-center font-bold border border-black cursor-pointer tracking-wider ${
                    active && "bg-blue-950 text-white"
                }`}
            >
                {title}
            </h1>
            <div className="border border-black p-2 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {active &&
                    qIds?.map((id) => (
                        <Question
                            key={id}
                            id={id}
                        ></Question>
                    ))}
            </div>
        </div>
    )
}

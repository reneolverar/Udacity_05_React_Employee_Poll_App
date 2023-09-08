export default function Poll() {
    const user = {
        id: "sarahedo",
        password: "password123",
        name: "Sarah Edo",
        avatarURL: null,
        answers: {
            "8xf0y6ziyjabvozdd253nd": "optionOne",
            "6ni6ok3ym7mf1p33lnez": "optionOne",
            am8ehyc8byjqgar0jgpub9: "optionTwo",
            loxhs1bqm25b708cmbf3g: "optionTwo",
        },
        questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
    }
    const question = {
        id: "8xf0y6ziyjabvozdd253nd",
        author: "sarahedo",
        timestamp: 1467166872634,
        optionOne: {
            votes: ["sarahedo"],
            text: "Build our new application with Javascript. Build our new application with Javascript. Build our new application with Javascript",
        },
        optionTwo: {
            votes: [],
            text: "Build our new application with Typescript",
        },
    }

    const handleClick = (e) => {
        e.preventDefault()
        console.log(e.target.name)
    }
    return (
        <div className="text-center">
            <h1 className="text-2xl">Poll by {user.id}</h1>
            <img
                className="m-auto"
                src="/employee-poll-logo.png"
                alt="Poll app logo"
                width={150}
                height={150}
            ></img>
            <h2 className="text-xl">Would you rather:</h2>
            <div className="flex justify-around">
                <div className="w-full px-1">
                    <textarea disabled value={question.optionOne.text} className="border w-full h-full text-center p-1" />
                    <button
                        className="block bg- bg-teal-600 text-white w-full"
                        name={"optionOne"}
                        onClick={handleClick}
                    >
                        Click
                    </button>
                </div>
                <div className=" w-full px-1">
                    <textarea disabled value={question.optionTwo.text} className="border w-full h-full text-center p-1" />
                    <button
                        className="block bg- bg-teal-600 text-white w-full"
                        name={"optionTwo"}
                        onClick={handleClick}
                    >
                        Click
                    </button>
                </div>
            </div>
        </div>
    )
}

import { handleVoteQuestion } from "../store/sharedActions"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import logo from "../assets/employee-poll-logo.png"
import { useAppDispatch, useAppSelector } from "../store/hooks"

export default function PollDetails() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authedUser = useAppSelector((state) => state.authedUser.value) as string
    console.log(authedUser);

    const users = useAppSelector((state) => state.users)
    const questions = useAppSelector((state) => state.questions)
    let params = useParams()
    const id = params.id as string

    useEffect(() => {
        if (!questions.byId[id]) {
            navigate("/pageNotFound/falseId")
            return
        }
    }, [])

    const [voteMessage, setVoteMessage] = useState(
        "*You already voted for this option. You can´t change your vote or vote again"
    )

    const question = questions.byId[id]
    const author = users.byId[question?.["author"]]

    const votedOptionOne = question?.optionOne.votes.includes(authedUser)
    const votedOptionTwo = question?.optionTwo.votes.includes(authedUser)
    const optionOneVotes = question?.optionOne.votes.length
    const optionTwoVotes = question?.optionTwo.votes.length

    const percentage = (nom: number, den: number) => {
        if (nom === 0) {
            return 0
        }
        return (nom / (nom + den)).toFixed(2)
    }

    const answeringDisabled = votedOptionOne || votedOptionTwo

    const handleClick = (e: React.MouseEvent<HTMLButtonElement> & {target: HTMLButtonElement}) => {
        e.preventDefault()
        dispatch(
            handleVoteQuestion({
                qId: id,
                answer: e.target.name,
            })
        )
        setVoteMessage("Thank you for voting!")
    }

    return (
        <div className="text-center">
            <h1 className="text-2xl">Poll by {author?.name}</h1>
            <h2 className="text-lg text-gray-500">@{author?.id}</h2>
            <img
                className="m-auto"
                src={author?.avatharURL || logo}
                alt={
                    author?.avatharURL
                        ? `${author?.name} Avatar`
                        : "App logo instead of avatar"
                }
                width={150}
                height={150}
            ></img>
            <h2 className="text-xl">Would you rather:</h2>
            <div className="flex justify-around items-stretch">
                <div className="w-full px-1 min-h-full">
                    <label className="border w-full text-center p-1 inline-block min-h-full">
                        {question?.optionOne.text}
                    </label>
                    <button
                        className="block bg- bg-teal-600 text-white w-full disabled:opacity-25"
                        name={"optionOne"}
                        onClick={handleClick}
                        disabled={answeringDisabled}
                    >
                        Click
                    </button>
                    {votedOptionOne && (
                        <div>
                            <p className=" border-b-2">{voteMessage}</p>
                            <p>
                                Option One has {optionOneVotes} votes (
                                {percentage(optionOneVotes, optionTwoVotes)}%)
                            </p>
                        </div>
                    )}
                </div>
                <div className=" w-full px-1">
                    <label className="border w-full text-center p-1 inline-block min-h-full">
                        {question?.optionTwo.text}
                    </label>
                    <button
                        className="block bg- bg-teal-600 text-white w-full disabled:opacity-25"
                        name={"optionTwo"}
                        onClick={handleClick}
                        disabled={answeringDisabled}
                    >
                        Click
                    </button>
                    {votedOptionTwo && (
                        <div>
                            <p className=" border-b-2">{voteMessage}</p>
                            <p>
                                Option Two has {optionTwoVotes} votes (
                                {percentage(optionTwoVotes, optionOneVotes)}%)
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
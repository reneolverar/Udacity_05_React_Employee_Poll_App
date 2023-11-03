import { FormEvent, useState } from "react"
import { handleAddQuestion } from "../store/sharedActions"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../store/hooks"

export default function CreatePoll() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [optionOneText, setOptionOneText] = useState<string>("")
    const [optionTwoText, setOptionTwoText] = useState<string>("")

    const checkInputError = () =>
        optionOneText === "" || optionTwoText === ""
            ? "*Please fill out all required fields"
            : optionOneText === optionTwoText
            ? "*Options text should be different"
            : optionOneText.length > 140 || optionTwoText.length > 140
            ? "*Keep your texts short! Less than 140 characters"
            : ""

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await dispatch(handleAddQuestion(optionOneText, optionTwoText))
        // navigate(`/poll/${newQuestion.id}`)
        navigate("/")
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="text-center my-5"
        >
            <h1 className="text-2xl">Would you rather:</h1>
            <p className="text-gray-600">Create your own poll</p>
            <label htmlFor="option-one-input">First Option*</label>
            <input
                type="text"
                placeholder="Option One"
                value={optionOneText}
                onChange={(e) => setOptionOneText(e.target.value)}
                className=" w-full m-2 border"
                id="option-one-input"
            ></input>
            <label htmlFor="option-two-input">Second Option*</label>
            <input
                type="text"
                placeholder="Option Two"
                value={optionTwoText}
                onChange={(e) => setOptionTwoText(e.target.value)}
                className=" w-full m-2 border"
                id="option-two-input"
            ></input>
            {checkInputError() && (
                <p className="opacity-50">{checkInputError()}</p>
            )}
            <button
                type="submit"
                className="button bg-gray-300 disabled:opacity-25"
                disabled={checkInputError().length > 0}
            >
                Submit
            </button>
        </form>
    )
}

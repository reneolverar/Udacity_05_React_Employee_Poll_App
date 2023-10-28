import { useState } from "react"
import { handleAddQuestion } from "../store/sharedActions"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

export default function CreatePoll() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [optionOneText, setOptionOneText] = useState("")
    const [optionTwoText, setOptionTwoText] = useState("")

    let disableForm = optionOneText === "" || optionTwoText === ""
    const checkInputError = () =>
        !disableForm && optionOneText === optionTwoText
            ? "*Options text should be different"
            : (!disableForm && optionOneText.length > 140) ||
              optionTwoText.length > 140
            ? "*Keep your texts short! Less than 140 characters"
            : false

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(handleAddQuestion({ optionOneText, optionTwoText }))
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
            {disableForm && (
                <p className="opacity-50">
                    *Please fill out all required fields
                </p>
            )}
            {checkInputError() && <p className=" text-red-700">{checkInputError()}</p>}
            <button
                type="submit"
                className="button bg-gray-300 disabled:opacity-25"
                disabled={disableForm || checkInputError()}
            >
                Submit
            </button>
        </form>
    )
}

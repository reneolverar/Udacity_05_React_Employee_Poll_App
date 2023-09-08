"use client"
import { useState } from "react"

export default function CreatePoll() {
    const [optionOne, setOptionOne] = useState("")
    const [optionTwo, setOptionTwo] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(optionOne, optionTwo)
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="text-center my-5"
        >
            <h1 className="text-2xl">Would you rather:</h1>
            <p className="text-gray-600">Create your own poll</p>
            <p>First Option</p>
            <input
                type="text"
                placeholder="Option One"
                value={optionOne}
                onChange={(e) => setOptionOne(e.target.value) }
                className=" w-full mx-5"
            ></input>
            <p>Second Option</p>
            <input
                type="text"
                placeholder="Option Two"
                value={optionTwo}
                onChange={(e) => setOptionTwo(e.target.value)}
                className=" w-full mx-5"
            ></input>
            <button className="button bg-gray-300">Submit</button>
        </form>
    )
}

import { useNavigate } from "react-router-dom";

export default function Question({ question }) {

    const navigate = useNavigate()

    const { author, timestamp } = question

    const handleClick = (e) => {
        e.preventDefault()
        navigate("/poll")
    }

    return (
        <div className="border border-black rounded-md text-center h-32 shadow-md hover:shadow-lg">
            <h1 className="font-bold">{author}</h1>
            <p>{timestamp}</p>
            <button className="button my-5 text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition ease-out duration-500" onClick={handleClick}> Show </button>
        </div>
    )
}

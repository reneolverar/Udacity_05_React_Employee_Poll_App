import { useParams } from "react-router-dom";

export default function PageNotFound() {
    const { error } = useParams()
    return (
    <div>
        <h1>404 Error</h1>
            <h1>Page Not Found: {error}</h1>
    </div>)
}
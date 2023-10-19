import { useParams } from "react-router-dom";

function PageNotFound() {
    const {error} = useParams()
    console.log(error);
    return (
    <div>
        <h1>404 Error</h1>
            <h1>Page Not Found: {error}</h1>
    </div>)
}

export default PageNotFound;
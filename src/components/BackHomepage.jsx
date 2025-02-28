import { useNavigate } from "react-router-dom"

export default function BackHomepage() {
    const navigate = useNavigate('')
    return (
        <>
        <button onClick={() => navigate('/books')}>Back</button>
        </>
    )
}
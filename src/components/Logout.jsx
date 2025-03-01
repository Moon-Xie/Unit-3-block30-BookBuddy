import React from "react"
import { useNavigate } from "react-router-dom"

export default function Logout({setToken}) {
    const navigate = useNavigate('')
    return (
        <>
            <button onClick={() => {
                setToken('')
                navigate('/books')
            }}>
                Logout
            </button>
        </>
    )
}
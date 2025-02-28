import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Checkout({token, CheckoutBook}) {
    const navigate = useNavigate('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isCheckout, setIsCheckout] = useState(false)
    const handleClick = async (e) => {
        e.preventDefault()

        if(token) {
            try {
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer ${token}`
                    }
                })
                const result = await response.json()
                console.log('checkout result is =>', result)
            } catch (error) {
                console.error(error)
            }
        } else {
            setErrorMessage('You must be logged in to perform this action')
            await setTimeout(() => setErrorMessage(''), 5000)
        }
    }
    return (
        <>
            <button onClick={handleClick}>Checkout</button>
            {errorMessage}
        </>
    )
}
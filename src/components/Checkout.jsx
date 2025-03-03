import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Checkout({token, CheckoutBook}) {
    const navigate = useNavigate('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const handleClick = async (e) => {
        e.preventDefault()
        if(token) {
            try {
                //console.log(CheckoutBook.available)
                //console.log(token)
                if(CheckoutBook.available) {
                        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${CheckoutBook.id}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            available: false
                        })
                    })
                    const result = await response.json()
                    console.log(result)
                    setSuccessMessage('You have successfully checked out!')
                } else {
                    const response1 = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization':`Bearer ${token}`
                        }
                    })
                    const result = await response1.json()
                    console.log('checkout result is =>', result.reservation)
                    const isCheckingout = (result.reservation).some((book) => { return book.title === CheckoutBook.title})
                    if(isCheckingout){
                        await setErrorMessage('You are currently checking this book out!')
                        await setTimeout(() => setErrorMessage(''), 5000)
                    } else{
                        await setErrorMessage('Sorry, this book is not available right now')
                        await setTimeout(() => setErrorMessage(''), 5000)
                    }
                }
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
            {errorMessage || successMessage}
        </>
    )
}
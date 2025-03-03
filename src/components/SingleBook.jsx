/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Checkout from "./Checkout"
import BackHomepage from "./BackHomepage"

export default function SingleBook({token, bookId}) {
    const [book, setBook] = useState([])
    let { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchSingleBook = async () => {
            try {
                const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId || id}`)
                const data = await response.json()
                setBook(data.book)
            } catch (err) {
                console.error(err)
            }
        }
        fetchSingleBook()
    }, [book.available])
    //console.log('book is =>' , book)
    
    return (
        <>
            {id ? (
                <div className="singleBookDetail">
                    <ul>
                        <li><b>{book?.title}</b></li>
                        <li><b>{book?.author}</b></li>
                        <li>
                            <b>Checkout Status: </b>
                            {(book?.available) ? 'Available' : 'Not available'}
                        </li>
                        <img src={book?.coverimage} alt={book?.title} />
                        <li>{book?.description}</li>
                    </ul><br/>
                    <BackHomepage />
                    <Checkout token={token} CheckoutBook={book} />
                </div>
            ) : (
                <button onClick={() => navigate(`/books/${bookId}`)}>View details</button>
            )}
        </>
    )
}
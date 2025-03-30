/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Checkout from "./Checkout"

export default function SingleBook({token, bookId}) {
    const defaultCover ="https://i.imgur.com/IcMw5fYb.jpg"
    const [book, setBook] = useState({})

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
    }, [book?.available])
    
    return (
        <>
            {id ? (
                <div className="singleBookDetail">

                    <ul>
                        <li><b>Title: {book?.title}</b></li>
                        <li><b>Author: {book?.author}</b></li>
                        <li>
                            <b>Checkout Status: </b>
                            {(book?.available) ? 'Available' : 'Not available'}
                        </li>
                        <img src={book?.coverimage ? book.coverimage : defaultCover}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = defaultCover;
                                }}
                                alt={book?.title} 
                         />
                        <li><b>Description: </b>{book?.description}</li>
                    </ul><br/>
                    <div className="buttonDiv">
                        <button onClick={() => navigate('/books')}>Back</button>
                        <Checkout token={token} CheckoutBook={book} onSuccess={setBook}/>
                    </div>
                </div>
            ) : (
                <button onClick={() => navigate(`/books/${bookId}`)}>View details</button>
            )}
        </>
    )
}
/* 
TODO - add your code to create a functional React component that 
displays all of the available books in the library's catalog. Fetch 
the book data from the provided API. Users should be able to click on 
an individual book to navigate to the SingleBook component and view its details. 
*/

import React, {useState, useEffect} from "react";
import SingleBook from "./SingleBook";


export default function Books({setBooks}) {
    const [allBooks, setAllBooks] = useState([])
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
                if(response.ok){
                    const data = await response.json();
                    console.log("data is =>", data.books)
                    await setBooks(data.books)
                    await setAllBooks(data.books)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchAllBooks();
    }, [])
    console.log("allBooks are =>", allBooks)
    return (
        <>
        <div className="bookCards">
            {allBooks.map((book) => (
                <div key={book.id} className="bookCard">
                    <img src={book.coverimage} alt={book.title} className='coverImg'/>
                    <h4>{book.title}</h4>
                    <h4><b>Author: </b> {book.author}</h4>
                    <SingleBook bookId={book.id}/>
                </div>
            ))}
        </div>
        </>
    )
}
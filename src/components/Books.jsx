/* 
TODO - add your code to create a functional React component that 
displays all of the available books in the library's catalog. Fetch 
the book data from the provided API. Users should be able to click on 
an individual book to navigate to the SingleBook component and view its details. 
*/

import React, {useState, useEffect} from "react";
import SingleBook from "./SingleBook";
import Navigate from "./Navigations";




export default function Books({ token }) {
    const [allBooks, setAllBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const defaultCover ="https://i.imgur.com/IcMw5fYb.jpg"
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
                if(response.ok){
                    const data = await response.json();

                    setAllBooks(data.books || data)
                    setFilteredBooks(data.books || data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchAllBooks();
    }, [])
    return (
        <>
            <nav className='filterContainer'>
                <div className="filter">
                    <Navigate allBooks={allBooks} setFilteredBooks={setFilteredBooks}/>
                </div>
            </nav>

            <div className="bookCards">
                {filteredBooks.map((book) => (
                    <div key={book.id} className="bookCard">
                        <img src={book?.coverimage.trim() ? book.coverimage : defaultCover}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = defaultCover;
                            }}
                            alt={book.title} 
                            className='coverImg'/>
                        <h4>{book.title}</h4>
                        <h4><b>Author: </b> {book.author}</h4>
                        <SingleBook token={token} bookId={book.id}/>
                    </div>
                ))}
            </div>
        </>
    )
}
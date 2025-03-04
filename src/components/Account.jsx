/* TODO - add your code to create a functional React component that renders 
account details for a logged in user. Fetch the account data from the provided API. 
You may consider conditionally rendering a message for other users that prompts 
them to log in or create an account.  */
import BackHomepage from "./BackHomepage"
import Logout from "./Logout"
import Return from "./Return"
import { useState, useEffect } from "react"


export default function Account({token, setToken}) {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [checkoutBooks, setCheckoutBooks] = useState([])
    const [refreshBooks, setRefreshBooks] = useState([])
    console.log(checkoutBooks)
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const result = await response.json()
            if(response.ok) {
                try {
                    console.log(result)
                    setFirstname(result.firstname)
                    setLastname(result.lastname)
                    setEmail(result.email)
                    setCheckoutBooks(result.books)
                    
                } catch (error) {
                    console.error(error)
                }
            }
        }
        fetchUser()
    },[refreshBooks])
    return (
        <>
        <div className="account-container">
            <h3>Firstname: {firstname}</h3>
            <h3>Lastname: {lastname}</h3>
            <h3>Email: {email}</h3>
            <div>
                <h3>You have been checking out:</h3>
                {checkoutBooks.length ? (
                    <div className="bookCards">
                        {checkoutBooks.map((book) => (
                            <div key={book.id} className="bookCard">
                                <img src={book.coverimage} alt={book.title} className='coverImg'/>
                                <h4>{book.title}</h4>
                                <h4><b>Author: </b> {book.author}</h4>
                                <Return token={token} bookId={book.id} setRefreshBooks={setRefreshBooks}/>
                                {/**/}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You haven't checked any books out yet!</p>
                )}

            </div>
        </div>
            
        </>
    )
}
/* TODO - add your code to create a functional React component that renders 
account details for a logged in user. Fetch the account data from the provided API. 
You may consider conditionally rendering a message for other users that prompts 
them to log in or create an account.  */
import { Link, useNavigate } from "react-router-dom"
export default function Account({setToken}) {
    const navigate = useNavigate('')
    return (
        <>
            <button>Account</button>
            <button onClick={() => setToken('')}>Logout</button>
           { /**/}
            <div>
                <h4>Checkout Books</h4>
            </div>
            <div>
                <h4>Returned Books</h4>
            </div>
        </>
    )
}
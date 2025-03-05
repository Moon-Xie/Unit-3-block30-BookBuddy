/* TODO - add your code to create a functional React component 
that renders a login form */
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login({setToken}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(email && password) {
            try {
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    })
                })
                const result = await response.json()
                if(response.ok) {
                    setSuccessMessage(result.message)
                    setToken(result.token)
                    setEmail('')
                    setPassword('')
                    setIsOpen(!isOpen)
                } else {
                    setErrorMessage(result.message)
                }
            } catch (err) {
                console.error(err)
            }
        }
    }
    return (
        <>
        
            {successMessage ?  (
                <div className="formContainer">
                    <div className="successContainer">
                        <h1>Congrandulations!</h1>
                        <h3>{successMessage}</h3>
                        <button onClick={() => navigate('/books')}>Back</button>
                        <button onClick={() => navigate('/account')}>Account</button>
                    </div>
                </div>
                
            ) : (
                <div className="formContainer">
                    <form className="Form" onSubmit={handleSubmit}>
                        <h2>Sign up</h2>                                       
                        <label>Email:
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                        <label>Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </label>
                        {errorMessage && (
                            <div>
                                {/*alert(message)*/}
                                <p>{errorMessage}</p>
                            </div> 
                        )}
                         <button onClick={() => navigate('/books')}>Cancle</button>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </>
        
    )
}
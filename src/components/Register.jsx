/* 
TODO - add your code to create a functional React component 
that renders a registration form 
*/

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Register() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(firstname&&lastname&&email&&password) {
            try {
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', {
                     method: "POST",
                     headers: {
                        'Content-Type': 'application/json',
                     },
                     body: JSON.stringify({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: password
                     })
                }
                )
                const result = await response.json()
                if(response.ok){
           
                    setSuccessMessage(result.message)
                    setFirstname('')
                    setLastname('')
                    setEmail('')
                    setPassword('')
                } else {
                   setErrorMessage(result.message)
                }
                
            } catch (error) {
                console.error(error)
            }
        }  else {
            setErrorMessage('Firstname/Lastname/Email/Password cannot be blank!')
        }    
    }
    
    return (
        <>
            {successMessage ? (
               <>
               <div className="formContainer">
                    <div className="successContainer">
                        <h1>Congrandulations!</h1>
                        <h3> {successMessage}</h3>
                        <button onClick={() => navigate('/books')}>Back</button>
                        <button onClick={() => navigate('/login')}>Login</button>
                    </div>
               </div>
               
               </>
            ) : (
                <div className="formContainer">
                
                <form className="Form" onSubmit={handleSubmit}>
                    <h2>Sign up</h2>
                    <label>Firstname:
                        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                    </label>
                    
                    <label>Lastname:
                        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                    </label>
                    
                    <label>Email:
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label>Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    
                    {errorMessage && (
                        <div>
                            <p>{errorMessage}</p>
                        </div> 
                    )}
                    <button onClick={() => navigate('/books')}>Back</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
            )}     
</>
        
    )
}
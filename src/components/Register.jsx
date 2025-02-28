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
    const [isOpen, setIsOpen] = useState(false)
    const togglePopup = () => setIsOpen(!isOpen)
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
                    console.log(result)
                    setIsOpen(!isOpen)
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
            <button onClick={togglePopup}>Register</button>
            {isOpen && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2>Sign up</h2>
                        <button onClick={togglePopup}>Cancle</button>
                        <form id="registerForm" onSubmit={handleSubmit}>
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
                                    {/*alert(message)*/}
                                    <p>{errorMessage}</p>
                                </div> 
                            )}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
               
            )}
            {successMessage && (
                <div>
                    <h4>{successMessage}</h4>
                    <button onClick={() => navigate('/books')}>Back</button>
                </div>
                
            )}
            
        </>
        
    )
}
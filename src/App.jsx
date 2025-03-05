import React, { useState, useEffect } from 'react'
import bookLogo from './assets/books.png'
import { useNavigate } from 'react-router-dom'
import Books from './components/Books'
import { Routes,Route } from 'react-router-dom'
import SingleBook from './components/SingleBook'
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'
import Logout from './components/Logout'

function App() {
  const [token, setToken] = useState(null)
  const navigate = useNavigate('')

  useEffect(() => {
    setTimeout(() => {navigate('/books')}, 0)
  },[])

  return (
    <>
      <nav className='navBar'> 
        <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
        {token ? (
          <>
            <div className="navButtons">
                <button onClick={() => {navigate('/books')}}>Home</button>
                <button onClick={() => {navigate('/account')}}>Account</button>
                <Logout setToken={setToken}/>
            </div> 
          </>
          ) : (
          <>
            <div className="navButtons">
                <button onClick={() => {navigate('/books')}}>Home</button>
                <button onClick={() => navigate('/register')}>Register</button>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
          </>
        )}
      </nav>
      <Routes>
        <Route path='/books' element={<Books token={token} setToken={setToken}/>}/>
        <Route path='/books/:id' element={<SingleBook token={token} />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login token={token} setToken={setToken}/>}/>
        <Route path='/account' element={<Account token={token} setToken={setToken}/>} />
        <Route path='/books' element={<Logout setToken={setToken} />}/>
      </Routes>
    </>
  )
}

export default App

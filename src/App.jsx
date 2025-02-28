import { useState } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import { Routes,Route } from 'react-router-dom'
import SingleBook from './components/SingleBook'
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'

function App() {
  const [token, setToken] = useState(null)
  //console.log(token)
  return (
    <>
      <nav className='navBar'> 
        <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
      </nav>
      <Routes>
        <Route path='/books' element={<Books token={token} setToken={setToken}/>}/>
        <Route path='/books/:id' element={<SingleBook token={token} />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login setToken={setToken}/>}/>
        <Route path='/api/uers/me' element={<Account />}/>
      </Routes>
    </>
  )
}

export default App

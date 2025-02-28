import { useState } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import { Routes,Route } from 'react-router-dom'
import SingleBook from './components/SingleBook'
import Register from './components/Register'
import Login from './components/Login'


function App() {
  const [token, setToken] = useState(null)
  console.log(token)
  return (
    <>
      <nav className='navBar'> 
        <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
        <h3>login/sign up</h3>
      </nav>
      <Routes>
        <Route path='/books' element={<Books setToken={setToken}/>}/>
        <Route path='/books/:id' element={<SingleBook  />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login setToken={setToken}/>}/>

      </Routes>
    </>
  )
}

export default App

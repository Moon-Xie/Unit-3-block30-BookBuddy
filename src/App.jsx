import { useState } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import { Routes,Route } from 'react-router-dom'
import SingleBook from './components/SingleBook'

function App() {
  const [token, setToken] = useState(null)
  const [books, setBooks] = useState([])
  console.log('books are =>', books)
  return (
    <>
      <nav className='navBar'> 
        <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
        <h1>Filter function here</h1>
        <h3>login/sign up</h3>
      </nav>
      <Routes>
        <Route path='/books' element={<Books setBooks={setBooks}/>}/>
        {/**/}
        <Route path='/books/:id' element={<SingleBook  />}/>

      </Routes>
    </>
  )
}

export default App

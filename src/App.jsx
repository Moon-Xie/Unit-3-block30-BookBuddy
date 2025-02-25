import { useState } from 'react'
import bookLogo from './assets/books.png'
import Books from './components/Books'

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
      <div className='bookCards'>
        <Books setBooks={setBooks}/>
      </div>
    </>
  )
}

export default App

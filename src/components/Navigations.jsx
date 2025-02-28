/* 
TODO - add your code to create a functional React component that 
renders a navigation bar for the different views in your single 
page application. You may consider conditionally rendering some 
options - for example 'Login' should be available if someone has not logged in yet. 
*/

export default function Navigate({allBooks, setFilteredBooks}) {
    const handleSearch = (filteredBook) => {
        const filtered = allBooks.filter((book) => {
           return book.title.toLowerCase().includes(filteredBook.toLowerCase()) || book.author.toLowerCase().includes(filteredBook.toLowerCase())
        })
        setFilteredBooks(filtered)
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search books by title or author"
                onChange={(e) => handleSearch(e.target.value)}
            />
        </>
    )
}
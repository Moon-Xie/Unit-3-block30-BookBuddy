export default function Return({token, bookId, setRefreshBooks}) {
    const handleClick = async (e) => {
        e.preventDefault()
        console.log(token)
        if(token) {
            try {
                const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                const result = await response.json()
                if(response.ok) {
                    const response1 = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization':`Bearer ${token}`
                        }
                    })
                    const result = response1.json()
                    setRefreshBooks(result.resevation)
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
    return (
        <>
        <button onClick={handleClick}>Return</button>
        </>
    )
}
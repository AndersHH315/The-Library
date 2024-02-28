import { useState } from 'react';
import axios from 'axios';

function Books() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const KEY = process.env.REACT_APP_API_KEY;


    function handleChange(e) {
        const query = e.target.value;
        setQuery(query);
    }

    async function searchBooks(e) {
        e.preventDefault();
        axios.get('https://www.googleapis.com/books/v1/volumes?q=' + query + '&keyes=' + KEY + '&maxResults=10')
        .then(data => {
            setResult(data.data.items);
            console.log(data.data.items);
        });
    }

    return (
        <div>
            <h1>Books</h1>
            <form onSubmit={searchBooks}>
                <input onChange={handleChange} value={query} name="query" type="text" placeholder="Search for a book..." autoComplete="off" />
                <br />
                <input type="submit" value="Search" />
            </form>

            <div>
                {result.map(query => (
                    <div key={query.id}>
                    <img src={query.volumeInfo.imageLinks !== undefined ? query.volumeInfo.imageLinks.thumbnail : ''} alt={query.title} />
                    <h1>{query.volumeInfo.title}</h1>
                    <p>{query.volumeInfo.description}</p>
                    <p>{query.volumeInfo.authors}</p>
                    </div>
                ))}
            </div>

        </div>
    )
};

export default Books;
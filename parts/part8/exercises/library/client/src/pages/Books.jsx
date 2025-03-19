import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = () => {
    const [genres, setGenres] = useState([])
    const [genreFilter, setGenreFilter] = useState('all')
    const [allBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        allBooks()
    }, [allBooks])

    useEffect(() => {
        if (data?.allBooks && genres.length === 0) {
            const uniqueGenres = data.allBooks.reduce((acc, book) => {
                book.genres?.forEach(genre => {
                    if (!acc.includes(genre)) {
                        acc.push(genre);
                    }
                });
                return acc;
            }, []);
            setGenres(uniqueGenres);
        }
    }, [data, genres.length]); 

    const handleChangeFilter = (event) => {
        const { value } = event.target

        setGenreFilter(value)

        value === 'all'
            ? allBooks()
            : allBooks({ variables: { genre: value } })
    }

    return (
        <div>
            <h2>Books</h2>

            {
                loading 
                    ? <>Loading...</>
                    : <>
                        <div>
                            <label htmlFor="genre-filter" style={{ marginRight: '10px' }}>
                                Filter by genre
                            </label>
                            <select
                                value={genreFilter}
                                name='genre-filter'
                                onChange={handleChangeFilter}
                            >
                                <option value="all">all</option>
                                {genres.map((genre, index) => (
                                    <option key={index} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th>author</th>
                                    <th>published</th>
                                </tr>
                                {data?.allBooks?.map((a) => (
                                    <tr key={a.id}>
                                        <td>{a.title}</td>
                                        <td>{a.author.name}</td>
                                        <td>{a.published}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
            }
        </div>
    )
}

export default Books

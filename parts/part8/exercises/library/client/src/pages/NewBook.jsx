import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'

const NewBook = ({ handleErrorMessage }) => {
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        published: '',
        genre: '',
        genres: []
    })

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
        onError: (error) => {
            const message = error.graphQLErrors.map(e => e.message).join('\n')
            handleErrorMessage(message)
        }
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setNewBook((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const addGenre = () => {
        setNewBook((prev) => ({
            ...prev,
            genres: prev.genres.concat(newBook.genre),
            genre: ''
        }))
    }

    const submit = async (event) => {
        event.preventDefault()

        createBook({
            variables: {
                title: newBook.title,
                published: Number(newBook.published),
                author: newBook.author,
                genres: newBook.genres
            }
        })

        setNewBook({
            title: '',
            author: '',
            published: '',
            genre: '',
            genres: []
        })
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="title">
                        Title
                    </label>
                    <input
                        id='title'
                        name='title'
                        value={newBook.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="author">
                        Author
                    </label>
                    <input
                        id='author'
                        name='author'
                        value={newBook.author}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="published">
                        Published
                    </label>
                    <input
                        id='published'
                        name='published'
                        type="number"
                        value={newBook.published}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="genre">
                        Genre
                    </label>
                    <input
                        id='genre'
                        name='genre'
                        value={newBook.genre}
                        onChange={handleChange}
                    />
                    <button onClick={addGenre} type='button'>
                        add genre
                    </button>
                </div>
                <div>Genres: {newBook.genres.join(', ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook;
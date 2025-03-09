import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import { useState } from 'react'

const Authors = () => {
    const result = useQuery(ALL_AUTHORS)
    const [updateAuthor] = useMutation(UPDATE_AUTHOR)

    const [authorToEdit, setAuthorToEdit] = useState({
        author: '',
        setBornTo: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setAuthorToEdit((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submit = (event) => {
        event.preventDefault()
 
        updateAuthor({
            variables: {
                name: authorToEdit.author,
                setBornTo: Number(authorToEdit.setBornTo)
            }
        })
        
        setAuthorToEdit({
            author: '',
            setBornTo: ''
        })
    }

    return (
        result.loading
            ? <>Loading...</>
            : <div>
                <h2>Authors</h2>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>born</th>
                            <th>books</th>
                        </tr>
                        {result.data.allAuthors.map((a) => (
                            <tr key={a.id}>
                                <td>{a.name}</td>
                                <td>{a.born}</td>
                                <td>{a.bookCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div>
                    <h3>Set birthyear</h3>
                    <form onSubmit={submit}>
                        <select
                            name="author"
                            id="author-select"
                            value={authorToEdit.author}
                            onChange={handleChange}
                        >
                            {result.data.allAuthors.map((a) => (
                                <option key={a.name} value={a.name}>{a.name}</option>
                            ))}
                        </select>
                        <div>
                            <label htmlFor="born">Born</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name='setBornTo'
                                id='born'
                                value={authorToEdit.setBornTo}
                            />
                        </div>
                        <button>Update</button>
                    </form>
                </div>
            </div>
    )
}

export default Authors

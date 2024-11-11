import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../store/blog'

export default function CreateNewBlog() {
    const dispatch = useDispatch()
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    })

    const handleChange = (event) => {
        const { value, name } = event.target

        setNewBlog((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        dispatch(addNewBlog(newBlog))
        setNewBlog({
            title: '',
            author: '',
            url: '',
        })
    }

    return (
        <>
            <h1>create new</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newBlog.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input
                        type="author"
                        id="author"
                        name="author"
                        onChange={handleChange}
                        value={newBlog.author}
                    />
                </div>
                <div>
                    <label htmlFor="url">Url</label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        onChange={handleChange}
                        value={newBlog.url}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

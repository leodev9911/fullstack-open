// import { setNotification } from './store/notification'
import { initializeBlogs, likeBlog, deleteBlog } from '../store/blog'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { useEffect } from 'react'

const BlogList = ({ user }) => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blog)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const handleLikePost = (blogToEdit) => {
        dispatch(likeBlog({...blogToEdit}))
    }

    const handleDeleteBlog = (blog) => {
        dispatch(deleteBlog(blog))
    }

    return (
        blogs.length > 0 && (
            <ul style={{ listStyle: 'none' }}>
                {[...blogs]
                    ?.sort((a, b) => Number(b?.likes) - Number(a?.likes))
                    ?.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            handleLikePost={() => handleLikePost(blog)}
                            deleteBlog={() => handleDeleteBlog(blog)}
                            user={user}
                        />
                    ))}
            </ul>
        )
    )
}

export default BlogList

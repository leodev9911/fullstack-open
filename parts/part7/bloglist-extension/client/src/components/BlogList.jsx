import { likeBlog, deleteBlog } from '../store/blog'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Blog from './Blog'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blog)
    const user = useSelector((state) => state.loginInfo)

    const handleLikePost = (blogToEdit) => {
        console.log(blogToEdit)
        dispatch(likeBlog({ ...blogToEdit }))
    }

    const handleDeleteBlog = (blog) => {
        dispatch(deleteBlog(blog))
    }

    return (
        <>
            <button>
                <Link to="/create" style={{ textDecoration: 'none', color: 'black' }}>create new</Link>
            </button>
            {blogs.length > 0 && (
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
            )}
        </>
    )
}

export default BlogList

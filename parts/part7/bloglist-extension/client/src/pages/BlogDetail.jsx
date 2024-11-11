import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../store/blog'
import { Togglable } from '../components/Togglable'
import { useRef } from 'react'

const BlogDetail = ({ blog }) => {
    const commentTogglableRef = useRef()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.loginInfo)

    const handleLikePost = (blogToEdit) => {
        dispatch(likeBlog({ ...blogToEdit }))
    }

    const handleDeleteBlog = (blog) => {
        dispatch(deleteBlog(blog))
    }

    const handleComment = (event, blog) => {
        event.preventDefault()
        
        dispatch(commentBlog(blog, commentTogglableRef, event.target.comment))
    }

    return (
        <>
            <h2>{blog?.title}</h2>
            <div>
                <a
                    className="blog-url"
                    href={blog?.url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {blog?.url}
                </a>
                <div>
                    <p className="blog-likes" style={{ display: 'inline-block' }}>likes {blog?.likes}</p>
                    <button
                        className="likeButton"
                        onClick={() => handleLikePost(blog)}
                    >
                        like
                    </button>
                </div>
                <p>added by {blog?.user?.name}</p>
                {user.username === blog?.user?.username && (
                    <button onClick={() => handleDeleteBlog(blog)}>
                        remove
                    </button>
                )}
            </div>
            <div>
                <h3>comments</h3>
                <Togglable buttonLabel="comment" ref={commentTogglableRef}>
                    <form onSubmit={(event) => handleComment(event, blog)}>
                        <input type="text" name="comment" />
                        <button>comment</button>
                    </form>
                </Togglable>
                {blog?.comments?.length > 0 && <ul>
                    {blog?.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
                </ul>}
            </div>
        </>
    )
}

export default BlogDetail

import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../store/blog'
import { Togglable } from '../components/Togglable'
import { useRef } from 'react'
import { Button, Card, CardContent, Container, TextField, Typography, IconButton } from '@mui/material'
import { LinkIcon } from '../components/icons/LinkIcon'
import { LikeIcon } from '../components/icons/LikeIcon'
import { ArrowBackIcon } from '../components/icons/ArrowBack'
import { useNavigate } from 'react-router-dom/dist'

const BlogDetail = ({ blog }) => {
    const commentTogglableRef = useRef()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.loginInfo)
    const navigate = useNavigate()

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
        <Container
            maxWidth='sm'
        >
            <div style={{ display: 'flex', gap: '20px' }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon width={24} height={24} />
                </IconButton>
                <Typography
                    variant='h3'
                >
                    {blog?.title}
                </Typography>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginTop: '12px'
            }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <LinkIcon width={20} height={20} />
                    <a
                        className="blog-url"
                        href={blog?.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {blog?.url}
                    </a>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}
                >
                    <p><strong>Added by</strong>: {blog?.author}</p>
                    <Button
                        variant='outlined'
                        onClick={() => handleLikePost(blog)}
                    >
                        <LikeIcon width='20' />
                        <Typography variant='button' sx={{ marginLeft: '10px' }}>{blog?.likes}</Typography>
                    </Button>
                </div>
                {user.username === blog?.user?.username && (
                    <button onClick={() => handleDeleteBlog(blog)}>
                        remove
                    </button>
                )}
            </div>
            <div style={{ marginTop: '100px' }}>
                <Typography variant='h5' sx={{ marginBottom: '12px' }}>Comments</Typography>
                <Togglable buttonLabel="comment" ref={commentTogglableRef}>
                    <form onSubmit={(event) => handleComment(event, blog)}>
                        <TextField
                            variant='outlined'
                            type="text"
                            name="comment"
                            sx={{
                                marginRight: '12px',
                                marginBottom: '12px'
                            }}
                            slotProps={{
                                htmlInput: {
                                    sx: { padding: '6px' }
                                }
                            }}
                        />
                        <Button variant='outlined'>Comment</Button>
                    </form>
                </Togglable>
                <div
                    style={{
                        display: 'flex',
                        marginTop: '20px',
                        flexDirection: 'column',
                        gap: '12px'
                    }}
                >
                    {
                        blog?.comments?.length > 0 && blog?.comments.map(comment => (
                            <Card
                                key={comment.id}
                                sx={{
                                    backgroundColor: '#F0F0F0',

                                    borderRadius: '0px 16px 16px 16px'
                                }}
                            >
                                <CardContent>
                                    <Typography variant="body2" sx={{ color: 'black' }}>
                                        {comment.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </Container>
    )
}

export default BlogDetail;

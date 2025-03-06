import { likeBlog, deleteBlog } from '../store/blog'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Blog from './Blog'
import { Box, Button, Container, Skeleton } from '@mui/material'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blog)
    const user = useSelector((state) => state.loginInfo)

    const handleLikePost = (blogToEdit) => {
        dispatch(likeBlog({ ...blogToEdit }))
    }

    const handleDeleteBlog = (blog) => {
        dispatch(deleteBlog(blog))
    }

    return (
        <Container
            maxWidth="xs"
        >
            <Button
                variant='contained'
                sx={{
                    marginBottom: '12px'
                }}
            >
                <Link
                    to="/create"
                    style={{
                        textDecoration: 'none',
                        color: 'white'
                    }}
                >
                    create new
                </Link>
            </Button>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}
            >
                {blogs.length > 0
                    ? (
                        [...blogs]
                            ?.sort((a, b) => Number(b?.likes) - Number(a?.likes))
                            ?.map((blog) => (
                                <Blog
                                    key={blog.id}
                                    blog={blog}
                                    handleLikePost={() => handleLikePost(blog)}
                                    deleteBlog={() => handleDeleteBlog(blog)}
                                    user={user}
                                />
                            ))
                    ) : <>
                        <Skeleton variant='rounded' width={396} height={88} />
                        <Skeleton variant='rounded' width={396} height={88} />
                        <Skeleton variant='rounded' width={396} height={88} />
                    </>
                }
            </Box>
        </Container>
    )
}

export default BlogList

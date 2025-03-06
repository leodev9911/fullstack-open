import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from './store/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateNew from './pages/CreateNew'
import Notification from './components/Notification'
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'
import { setUsers } from './store/users'
import { initializeBlogs } from './store/blog'
import BlogDetail from './pages/BlogDetail'
import NavBar from './components/NavBar'
import { Container } from '@mui/material'

const App = () => {
    const notification = useSelector((state) => state.notification)
    const user = useSelector((state) => state.loginInfo)
    const users = useSelector((state) => state.users)
    const blogs = useSelector((state) => state.blog)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!users || users.length === 0) {
            dispatch(setUsers())
        }
        if (!blogs || blogs.length === 0) {
            dispatch(initializeBlogs())
        }

        if (user) {
            blogService.setToken(user.token)
        }
    }, [dispatch, user, users, blogs])

    const userMatch = useMatch('/users/:id')
    const blogMatch = useMatch('/blogs/:id')

    const userDetail = users.find((user) => user?.id === userMatch?.params?.id)
    const blogDetail = blogs.find((blog) => blog?.id === blogMatch?.params?.id)

    const handleLogout = () => dispatch(logout())

    return (
        <>
            {user && (
                <>
                    <NavBar user={user} handleLogout={handleLogout} />
                </>
            )}
            <Container
                maxWidth="xl"
                sx={{ paddingY: '24px', height: '100%' }}
            >
                {(notification.error || notification.success) && (
                    <Notification
                        error={notification.error}
                        success={notification.success}
                    />
                )}
                <Routes>
                    <Route
                        path="/"
                        element={
                            user ? <Home /> : <Navigate replace to={'/login'} />
                        }
                    />
                    <Route
                        path="/create"
                        element={
                            user ? (
                                <CreateNew />
                            ) : (
                                <Navigate replace to={'/login'} />
                            )
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            user ? (
                                <Users users={users} />
                            ) : (
                                <Navigate replace to={'/login'} />
                            )
                        }
                    />
                    <Route
                        path="/users/:id"
                        element={
                            user ? (
                                <UserDetail user={userDetail} />
                            ) : (
                                <Navigate replace to={'/login'} />
                            )
                        }
                    />
                    <Route
                        path="/blogs/:id"
                        element={
                            user ? (
                                <BlogDetail blog={blogDetail} />
                            ) : (
                                <Navigate replace to={'/login'} />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            !user ? (
                                <LoginForm notification={notification} />
                            ) : (
                                <Navigate replace to={'/'} />
                            )
                        }
                    />
                </Routes>
            </Container>
        </>
    )
}

export default App;

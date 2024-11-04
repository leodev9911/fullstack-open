import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateNewBlog from './components/CreateNewBlogForm'
import Notification from './components/Notification'
import { Togglable } from './components/Togglable'
import BlogList from './components/BlogList'
import { logout } from './store/user'
import { useDispatch } from 'react-redux'

const App = () => {
    const newNoteToggableRef = useRef()
    const notification = useSelector(state => state.notification)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            blogService.setToken(user.token)
        }
    }, [user])

    return (
        <>
            {user ? (
                <>
                    <h1>blogs</h1>
                    {(notification.error || notification.success) && (
                        <Notification
                            error={notification.error}
                            success={notification.success}
                        />
                    )}
                    <div>
                        <span>{user.name} logged in</span>
                        <button onClick={() => dispatch(logout())}>logout</button>
                    </div>
                    <Togglable buttonLabel="new note" ref={newNoteToggableRef}>
                        <CreateNewBlog
                            newNoteToggableRef={newNoteToggableRef}
                        />
                    </Togglable>
                    <BlogList user={user} />
                </>
            ) : (
                <LoginForm
                    notification={notification}
                />
            )}
        </>
    )
}

export default App

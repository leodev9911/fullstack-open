import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from '../notification'
import blogsService from '../../services/blogs'

const initialState = []

const notificationSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            return state = action.payload
        },
        createNewBlog: (state, action) => {
            return state.concat(action.payload)
        },
        editBlogAction: (state, action) => {
            const editedBlog = action.payload
            const editedBlogIndex = state.findIndex(blog => blog.id === editedBlog.id)
            state[editedBlogIndex] = editedBlog

            return state
        },
        deleteBlogAction: (state, action) => {
            const deletedBlogId = action.payload
            return state.filter(blog => blog.id !== deletedBlogId)
        }
    }
})

export default notificationSlice.reducer
export const { setBlogs, createNewBlog, editBlogAction, deleteBlogAction } = notificationSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const addNewBlog = (newBlog) => {
    return async dispatch => {
        try {
            const response = await blogsService.create(newBlog)

            if (response) {
                dispatch(createNewBlog(response))
                dispatch(setNotification(`a new blog ${response.title} added`, 'success', 5))
            }
        } catch (error) {
            dispatch(setNotification('There was an error when trying to add a new note', 'error', 5))
            console.log(error)
        }
    }
}

export const likeBlog = (blogToEdit) => {
    return async dispatch => {
        try {
            blogToEdit.likes += 1
            blogToEdit.user = blogToEdit.user.id
            const response = await blogsService.addLike(blogToEdit)

            if (response) {
                dispatch(editBlogAction(response))
                dispatch(setNotification(
                    `You voted ${response.title}`,
                    'success',
                    5
                ))
            }
        } catch (error) {
            dispatch(setNotification(
                'There was an error when trying to edit the note',
                'error',
                5
            ))
            console.log(error)
        }
    }
}

export const commentBlog = (blog, commentTogglableRef, input) => {
    return async dispatch => {
        try {
            const blogToEdit = structuredClone(blog)
            blogToEdit?.comments?.push({ content: input.value })
            blogToEdit.user = blogToEdit.user.id
            const response =  await blogsService.commentBlog(blogToEdit)
    
            if (response) {
                dispatch(editBlogAction(response))
                input.value = ''
                commentTogglableRef.current.toggleVisibility()
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export const deleteBlog = (blogToDelete) => {
    return async dispatch => {
        try {
            if (window.confirm(`Remove blog '${blogToDelete.title}' by '${blogToDelete.author}'`)) {
                await blogsService.deleteBlog(blogToDelete.id)
                dispatch(deleteBlogAction(blogToDelete.id))
                dispatch(setNotification(
                    `Blog '${blogToDelete.title}' by '${blogToDelete.author}' removed`,
                    'success',
                    5
                ))
            } else {
                return
            }
        } catch (error) {
            dispatch(setNotification(
                'There was an error when trying to delete the note',
                'error',
                5
            ))
            console.log(error)
        }
    }
}
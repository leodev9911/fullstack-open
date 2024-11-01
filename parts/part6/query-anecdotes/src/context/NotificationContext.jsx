import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE':
            return (state = `you created ${action.payload}`)
        case 'VOTE':
            return (state = `you voted ${action.payload}`)
        case 'CLEAR':
            return (state = '')
        case 'ERROR': 
            return (state = `ERROR: ${action.payload}`)
        default:
            return state
    }
}

const NotificationContextProvider = ({ children }) => {
    const [notifications, dispatchNotifications] = useReducer(
        notificationReducer,
        ''
    )

    return (
        <NotificationContext.Provider
            value={[notifications, dispatchNotifications]}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext)[0]
}

export const useDispatchNotification = () => {
    return useContext(NotificationContext)[1]
}

export default NotificationContextProvider

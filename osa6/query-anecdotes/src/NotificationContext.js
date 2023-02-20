import { useReducer } from "react"
import { createContext, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'VOTE':
            state = `you voted ${action.payload}`
            console.log(state)
            return state
        case 'CREATE':
            state = `you create ${action.payload}`
            console.log(state)
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) =>  {
    const [message, messageDispatch] = useReducer(notificationReducer)

    return (
        <NotificationContextProvider value={[message, messageDispatch]}>
            {props.children}
        </NotificationContextProvider>
    )
}
export const useMessageValue = () => {
    const messageAndDispatch = useContext(NotificationContext)
    return messageAndDispatch[0]
}

export const useMessageDispatch = () => {
    const messageAndDispatch = useContext(NotificationContext)
    return messageAndDispatch[1]
}

export default NotificationContext
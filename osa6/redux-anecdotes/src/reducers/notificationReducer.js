import { createSlice } from "@reduxjs/toolkit"


const initialState = null

const notificationReducer = createSlice ({
    name: 'notification',
    initialState,
    reducers: {
        notification(state, action) {
            console.log(action.payload)
            state = action.payload
            return state
        },
        hidenNotification() {
            return initialState
        }
    }
})

export const { notification, hidenNotification } = notificationReducer.actions

let timeOut = null

export const notificationCreation = (message, time) => {
    return async dispatch => {
        dispatch(notification(message))

        console.log(timeOut)
        if(timeOut) {
            clearTimeout(timeOut)
        }

        timeOut = setTimeout(() => dispatch(hidenNotification()), time * 1000)
    }
}

export default notificationReducer.reducer
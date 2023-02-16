import {useDispatch} from 'react-redux'
import { createAnectode } from '../reducers/anecdoteReducer'
import { hidenNotification, notification } from '../reducers/notificationReducer'


const AnectodeForm = () => {
    const dispatch = useDispatch()

    const addAnectode = async (event) => {
        event.preventDefault()
        const content = event.target.anectode.value
        event.target.anectode.value = ''
        dispatch(createAnectode(content))
        dispatch(notification(`you created ${content}`))
        setTimeout(() => dispatch(hidenNotification()), 5000)
    }

    return (
      <form onSubmit={addAnectode}>
        <div>
            <input name='anectode'/>
        </div>
        <button type='submit'>create</button>
      </form>
    )
}

export default AnectodeForm
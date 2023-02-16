import { useSelector, useDispatch } from 'react-redux'
import { anecVote } from '../reducers/anecdoteReducer'
import { notificationCreation } from '../reducers/notificationReducer'

const AnectodeList = () => {
    const anecdote = useSelector(state =>
        state.filter
        ? state.anecdote.filter((anecdote) =>
            anecdote.content.toLowerCase()
            )
        : state.anecdote
    )

    const dispatch = useDispatch()

    const vote = (anecdote) => {
      dispatch(anecVote(anecdote))
      dispatch(notificationCreation(`you voted ${anecdote.content}`, 5))
    }
  
    return ( 
        <div>
            {anecdote.slice().sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnectodeList
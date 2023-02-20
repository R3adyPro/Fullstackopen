import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useMessageDispatch } from './NotificationContext'

const App = () => {
  const dispatch = useMessageDispatch()
  const queryClient = new useQueryClient()
  const newMutateAnecdote = useMutation(updateAnecdote, {
    onSuccess: () =>
      queryClient.invalidateQueries('anecdotes')
  })


  const handleVote = (anecdote) => {
    newMutateAnecdote.mutate(anecdote)
    dispatch({ type: 'VOTE', payload: anecdote.content})
  }

  const result = useQuery('anecdotes', getAnecdotes)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if( result.isError) {
    return <div>anecdote service is not available due to proplems in server</div>
  }

  const anecs = result.data
  
  return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecs.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
  )
}

export default App

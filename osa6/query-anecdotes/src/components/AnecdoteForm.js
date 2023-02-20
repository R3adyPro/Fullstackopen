import { createAnecdote} from "../requests"
import { useMutation, useQuery, useQueryClient}  from "react-query"
import { useMessageDispatch } from "../NotificationContext"


const AnecdoteForm = () => {
  const dispatch = useMessageDispatch()
  const queryClient = new useQueryClient()
  const newMutateAnecdote = useMutation(createAnecdote, {
    onSuccess: () =>
      queryClient.invalidateQueries('anecdotes')
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({ type: 'CREATE', payload: content})
    newMutateAnecdote.mutate(content)
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

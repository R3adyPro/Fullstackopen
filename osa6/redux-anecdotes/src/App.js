import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnectodeForm from './components/anecdoteForm'
import AnectodeList from './components/anecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter/>
      <AnectodeList />
      <h2>create new</h2>
      <AnectodeForm />
    </div>
  )
}

export default App
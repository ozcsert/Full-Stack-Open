import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import SearchFilter from './components/VIsibilityFIlter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

const dispatch = useDispatch()

//useEffect(() => {
//  const fetchData = async () => {
//    const anecdotes = await anecdoteServices.getAll();
//    dispatch(setAnecdotes(anecdotes))
//  }
//  fetchData()
//}, [dispatch])

//useEffect(() => {
//  
//})
//

useEffect(() => {
  dispatch(initializeAnecdotes())
},[dispatch])

  return (
    <div>
      <Notification />
      <SearchFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
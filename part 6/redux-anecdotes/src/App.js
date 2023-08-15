import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import SearchFilter from './components/VIsibilityFIlter'
import Notification from './components/Notification'
const App = () => {
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
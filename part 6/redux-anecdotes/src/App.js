import { useSelector, useDispatch } from 'react-redux'
import { vote, createQuote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state.map(anecdote => anecdote.payload))

  const addQuote = (event) => {
    event.preventDefault()
    const content = event.target.quote.value
    event.target.quote.value = ""
    console.log(content);
    dispatch(createQuote(content))
}

const byVotes = (b1, b2) => b2.votes - b1.votes

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() =>dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addQuote}>
        <input name="quote" type="text"/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
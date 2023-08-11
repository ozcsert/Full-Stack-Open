
import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'


const AnecdoteList = () => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.map(anecdote => anecdote.payload))
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
        </div>
    )
}


export default AnecdoteList
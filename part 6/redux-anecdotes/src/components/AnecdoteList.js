
import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
      console.log(anecdotes);
      anecdotes = anecdotes.map(anecdote => anecdote)
      if (filter === '') {
        return anecdotes
      } return anecdotes
        .filter(anecdote => anecdote.content.includes(filter))
})
    console.log(anecdotes);
    const byVotes = (b1, b2) => b2.votes - b1.votes

  const toVote = (quoteId) => {
    dispatch(vote(quoteId))
    console.log(anecdotes.find(a => a.id === quoteId));
    dispatch(setNotification(`Upvoted ${anecdotes.find(a => a.id === quoteId).content}`))
  }

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
              <button onClick={() =>toVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        </div>
    )
}


export default AnecdoteList

import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
      anecdotes = anecdotes.map(anecdote => anecdote)
      if (filter === '') {
        
        return anecdotes
      } return anecdotes
        .filter(anecdote => anecdote.content.includes(filter))
})
    const byVotes = (b1, b2) => b2.votes - b1.votes

  const toVote = (quoteId) => {
    //dispatch(vote(quoteId))
    const anecdoteToUpdate = anecdotes.find(a => a.id === quoteId);
    console.log(anecdoteToUpdate);
    dispatch(updateAnecdote(anecdoteToUpdate))
    dispatch(setNotification(`Upvoted ${anecdotes.find(a => a.id === quoteId).content}`, 5000))
  }

//  useEffect(() => {
//    dispatch(updateAnecdote())
//  }, [dispatch])

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
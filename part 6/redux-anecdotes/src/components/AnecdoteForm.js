import { createQuote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addQuote = (event) => {
        event.preventDefault()
        const content = event.target.quote.value
        event.target.quote.value = ""
        console.log(content);
        dispatch(createQuote(content))
    }

    return (
        <div>
    <h2>create new</h2>
    <form onSubmit={addQuote}>
      <input name="quote" type="text"/>
      <button type="submit">create</button>
    </form>
    </div>
    )
}


export default AnecdoteForm
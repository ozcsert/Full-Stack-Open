import { createStore } from 'redux'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const generateId = () =>
Number((Math.random() * 1000000).toFixed(0))

export const vote = (id) => {
  console.log('vote', id)
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const createQuote = (content) => {
  return {
    type: 'NEW_QUOTE',
    payload: {
      content,
      votes : 0,
      id: generateId()
    }
  }
}

const initialState = anecdotesAtStart.map(anecdote => createQuote(anecdote))

const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_QUOTE':
      return initialState.concat(action)
   case 'VOTE': {
    const id = action.payload.id
    const quoteToVote = state.find(q => q.payload.id === id)

    const newVotedQuote = {
      type: quoteToVote.type,
      payload : {
        ...quoteToVote.payload, 
        votes: ++quoteToVote.payload.votes
    }
    }
    console.log(newVotedQuote);
    return state.map(quote => quote.payload.id !== id ? quote : newVotedQuote)
  }
  default:
  return state
}
}

const store = createStore(anecdoteReducer)
console.log(store.getState())


export default anecdoteReducer




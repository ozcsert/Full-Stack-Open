//import { createStore } from 'redux'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'
//const anecdotesAtStart = [
//  'If it hurts, do it more often',
//  'Adding manpower to a late software project makes it later!',
//  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//  'Premature optimization is the root of all evil.',
//  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
//]

const generateId = () =>
Number((Math.random() * 1000000).toFixed(0))

const populate = (content) => {
  return {
      content,
      votes : 0,
      id: generateId()
  }
}

//const initialState = anecdotesAtStart.map(anecdote => populate(anecdote))

const initialState = []
const anecdoteSlice = createSlice({
  name : 'anecdotes',
  initialState,
  reducers : {
//    createQuote(state, action) {
//      state.push(
//        content)
//    },
    vote(state, action) {
      console.log(action.payload);
        const id = action.payload
        //console.log(JSON.parse(JSON.stringify(state)))
        const quoteToVote = state.find(q => q.id === id)
        const newVotedQuote = {
          ...quoteToVote,
          votes: ++quoteToVote.votes
        }
        state.map(quote => quote.id !== id ? quote : newVotedQuote)
    },
    setAnecdotes(state,action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdote = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdote))
  }
}

export const createQuote = content => {
  return async dispatch => {
    console.log(content);
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote =  anecdoteToUpdate => {
  return async dispatch => {
    //const anecdoteToUpdate = anecdotes.find(a => a.id === quoteId)
    const request = await anecdoteServices.update({...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1})
    dispatch(vote(request.id))
  }
}
//const updateLikes = async (blogToUpdate) => {
//
//  const request = await blogService.update(blogToUpdate, blogToUpdate.id)
//  setErrorMessage(`Blog ${blogToUpdate.title} was succesfully updated`)
//  setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : request))
//}


//export const upVote = id => {
//  
//  dispatch(vote(id))
//}

export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export default anecdoteSlice.reducer




import React from 'react'
import ReactDOM from 'react-dom/client'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
//import anecdoteReducer from './reducers/anecdoteReducer'
//import { combineReducers } from 'redux'
//import filterReducer from './reducers/filterReducer'
import store from './components/store'

console.log(store.getState());


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
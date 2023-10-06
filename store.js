import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

const initialState = {};

export default createStore(reducers, initialState, applyMiddleware(thunkMiddleware))
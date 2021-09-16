import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import SongReducer from './reducer/SongReducer'

const rootReducer = combineReducers({
    SongReducer,
})

export const store = createStore(rootReducer,applyMiddleware(thunk))
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import SongReducer from './reducer/SongReducer'
import PlaylistReducer from './reducer/PlaylistReducer'

const rootReducer = combineReducers({
    SongReducer,
    PlaylistReducer,
})

export const store = createStore(rootReducer,applyMiddleware(thunk))
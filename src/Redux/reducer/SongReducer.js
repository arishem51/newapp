/* eslint-disable import/no-anonymous-default-export */
import {GET_LIST_SONG, GET_MP3_SONG, GET_SONG_DETAIL, PLAY_LISTSONG, PLAY_PLAYLIST, SET_SONG_DETAIL, SONG_DETAIL} from '../type/Music'
const initialState = {
    listSong:[],
    songDetail: {},
    typeSong:true // true is listSong,false is playlist Song
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_SONG:{
            return {...state,listSong:action.listSong}
        }
        case SONG_DETAIL:{
            return {...state,songDetail:action.songDetail,typeSong:action.typeSong}
        }
    default:
        return state
    }
}

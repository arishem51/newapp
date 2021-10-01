/* eslint-disable no-fallthrough */

import { ADD_MUSIC_TO_PLAYLIST, CHANGE_PLAYLIST, CHANGE_PLAYLIST_MODAl, CLOSE_MODAL, CREATE_PLAYLIST, OPEN_MODAL, REMOVE_MUSIC_TO_PLAYLIST, REMOVE_PLAYLIST } from "../type/Music"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    Modal:false,
    Component:<p>123</p>,
    listPlaylist:[]
}

export default (state = initialState, action) => {
    switch (action.type) {

        case OPEN_MODAL:{
            return {...state,Modal:true,Component:action.Component}
        }
        case CLOSE_MODAL:{
            return {...state,Modal:false}
        }
        case CREATE_PLAYLIST:{
            const {newPlaylist} = action;
            let newListPlaylist = [...state.listPlaylist]
            let index = newListPlaylist.findIndex(item => item.name === newPlaylist.name)
            if(index === -1){
                newListPlaylist.push(newPlaylist);
            }
            return {...state,listPlaylist:newListPlaylist,Modal:false}
        }
        case ADD_MUSIC_TO_PLAYLIST:{
            const {music,namePlaylist} = action.item;
            let newListPlaylist = [...state.listPlaylist]
            let index = newListPlaylist.findIndex(item => item.name === namePlaylist);
            if(index !== -1){
                newListPlaylist[index].listBaiHat.push(music);
            }
            state.listPlaylist = [...newListPlaylist]
            return {...state}
        }
        case REMOVE_MUSIC_TO_PLAYLIST:{
            const {music,namePlaylist} = action.item;
            let newListPlaylist = [...state.listPlaylist]
            let index = newListPlaylist.findIndex(item => item.name === namePlaylist);
            if(index !== -1){
                let indexRemove = newListPlaylist[index].listBaiHat.findIndex(item => item.name === music.name);
                if(indexRemove !== -1){
                    newListPlaylist[index].listBaiHat.splice(indexRemove,1)
                }
            }
            state.listPlaylist = [...newListPlaylist]
            return {...state}
        }
        case REMOVE_PLAYLIST:{
            const {namePlaylist} = action;
            let newListPlaylist = [...state.listPlaylist];
            const index =  newListPlaylist.findIndex(item => item.name === namePlaylist);
            if(index !== -1){
                newListPlaylist.splice(index,1)
            }
            state.listPlaylist = [...newListPlaylist]
            return {...state}
        }
        case CHANGE_PLAYLIST:{
            let newListPlaylist = [...state.listPlaylist];
            const index = newListPlaylist.findIndex(item => item.name === action.newPlaylist.oldName)
            if(index !== -1){
                newListPlaylist[index].name = action.newPlaylist.newName
            }
            console.log(newListPlaylist)
            state.listPlaylist = [...newListPlaylist]
            return {...state,Modal:false}
        }
    default:
        return {...state}
    }
}

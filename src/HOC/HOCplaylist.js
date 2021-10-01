import React from 'react'
import { useSelector } from 'react-redux'

export default function HOCplaylist() {
    const {Modal,Component} = useSelector(state => state.PlaylistReducer);
    return (
        <div className='hocPlaylist' style={{display:`${Modal ? "block" : 'none' }`}}>
            <div className='hocPlaylistContent'>
                   {Component}
            </div>
        </div>
    )
}

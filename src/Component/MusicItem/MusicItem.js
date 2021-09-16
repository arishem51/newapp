import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSongDetailAction } from '../../Redux/action/ListMusicAction';
import { GET_SONG_DETAIL } from '../../Redux/type/Music'

export default function MusicItem(props) {
    const { songDetail } = useSelector(state => state.SongReducer);
    const dispatch = useDispatch();
    const { item, index, listSong } = props
    useEffect(()=>{
        if(item.id === listSong[0].id){
            dispatch(getSongDetailAction(listSong[0]))
        }   
    },[])
    let classActive = '';
    if(songDetail?.id === item.id){
        classActive ='activeBgPink'
    }
    return (
        <div className={`flex items-center rounded-md p-2 cursor-pointer media  ${classActive}`} key={index} onClick={() => {
            dispatch(getSongDetailAction(item))
        }} >
            <div className='flex items-center'>
                <div>
                    <img style={{ width: '40px', height: '40px' }} src={item.thumbnail} alt={item.title}></img>
                </div>
                <div className='ml-2'>
                    <p className='opacity-80 media__text'>{item.name}</p>
                    <p className='opacity-60 text-xs hover:text-pink-500 hover:opacity-100'>{item.artists_names}</p>
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import { useDispatch } from 'react-redux'
import { getSongDetailAction } from '../../Redux/action/ListMusicAction';
import { ADD_MUSIC_TO_PLAYLIST, PLAY_PLAYLIST, REMOVE_MUSIC_TO_PLAYLIST, SONG_DETAIL } from '../../Redux/type/Music';

export default function PlaylistItem(props) {
    const dispatch = useDispatch();
    const {item,namePlaylist,type} = props
    
    return (
        <>
        <div className='flex items-center p-2'>
           <span className='opacity-60'><i class="fa fa-music"></i></span>
           <div className='ml-2'>
               <img onClick={()=>{
                   !type ? dispatch(getSongDetailAction(item,false)) :  console.log('')
               }} src={item.thumbnail} alt='hihi' style={{width:40,height:40}} className='rounded-sm cursor-pointer'></img>
           </div>
           <div className='flex flex-col justify-center ml-2'>
               <p>
                   {item.name}
               </p>
               <span className='opacity-60 hover:opacity-100 hover:text-pink-500'>
                   {item.artists_names}
               </span>
           </div>
           {!type ? <div className='ml-auto mr-3 cursor-pointer' onClick={()=>{
                dispatch({
                    type:REMOVE_MUSIC_TO_PLAYLIST,
                    item:{
                        music:item,
                        namePlaylist:namePlaylist
                    }
                })
           }}>
               <span><i class="fa fa-minus"></i></span>
           </div> : <div className='ml-auto mr-3 cursor-pointer' onClick={()=>{ 
               dispatch({
                   type:ADD_MUSIC_TO_PLAYLIST,
                   item:{
                       music:item,
                       namePlaylist:namePlaylist
                   }
               })
           }}>
               <span><i class="fa fa-plus"></i></span>
           </div>}



        </div>
        <hr className='w-full block opacity-10'/></>
    )
}

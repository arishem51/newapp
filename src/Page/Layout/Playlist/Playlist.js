import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PlaylistItem from '../../../Component/PlaylistItem/PlaylistItem';
import _ from 'lodash'
import { CHANGE_PLAYLIST, CHANGE_PLAYLIST_MODAl, OPEN_MODAL, REMOVE_PLAYLIST } from '../../../Redux/type/Music';
import { useHistory } from 'react-router';
import ChangePlaylist from '../../../Component/ChangePlaylist/ChangePlaylist';

export default function Playlist(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const {listSong} = useSelector(state => state.SongReducer);
    const {listPlaylist}  = useSelector(state => state.PlaylistReducer);
    const findThisPlaylist = ()=>{
        let index = listPlaylist?.findIndex(item => item.name === props.match.params.name);
        let thisPlayList;
        if(index !== -1){
            thisPlayList = listPlaylist[index]
        }

        return thisPlayList
    }
    const thisPlayList = findThisPlaylist();
    const renderListSongRandom = ()=>{
        
        const newArr = listSong.filter(item =>{
            return !thisPlayList?.listBaiHat.includes(item);
        })
        return newArr?.slice(0,10).map((item,index) =>{
            return <div key={index} className='baiHatGoiY_item'>
                <PlaylistItem item={item}  namePlaylist={props.match.params.name} type={true}></PlaylistItem>
            </div>
        })
    }
    const renderBaihatPlaylist = ()=>{
        const {listBaiHat} = thisPlayList;
        return listBaiHat.map((item,index)=>{
            return <div key={index}>
                <PlaylistItem item={item}  namePlaylist={props.match.params.name} type={false}></PlaylistItem>
            </div>
        })
    }
    return (
        <div className='playlist_content' onScroll={(e) => {
            const header = e.target.previousSibling.style
            if (e.target.scrollTop > 80) {
                Object.assign(header, {
                    backgroundColor: '#37075d',
                    boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
                    zIndex: '100'
                })
            } else {
                Object.assign(header, {
                    backgroundColor: '',
                    boxShadow: '',
                })
            }
        }}>
            <div className='playlist_left'>
                <img src='https://photo-zmp3.zadn.vn/album_default.png' alt='imgDefault' style={{ borderRadius: '8px' }}></img>
                <div className='playlist_leftText mt-3 text-center font-semibold text-2xl'>
                    {props.match.params.name}

                </div>
                <div className='flex justify-center items-center'>
                    <p className='text-center text-xs opacity-60 mr-1'>Được tạo bởi </p>
                    <span className='text-xs'>User{props.match.params.name}</span>
                </div>
                <p className='text-center text-xs opacity-60 mt-1'>Công khai </p>
                <div className='flex justify-between items-center playlist_btn'>
                    <button className='mt-0 mr-2' onClick={()=>{
                        dispatch({
                            type:REMOVE_PLAYLIST,
                            namePlaylist : props.match.params.name
                        })
                        history.push('/newapp')
                    }}>Xóa Playlist</button>
                    <button className='mt-0 ml-2' onClick={()=>{
                        dispatch({
                            type:OPEN_MODAL,
                            Component:<ChangePlaylist namePlaylist={props.match.params.name}></ChangePlaylist>
                        })
                    }}>Sửa Playlist</button>

                </div>
            </div>
            <div className='playlist_right'>
                <div className='container'>
                    <div className='playlist_listBaiHat'>
                       { thisPlayList && thisPlayList.listBaiHat.length > 0  ? renderBaihatPlaylist() :  <div className='container_listBaiHat flex items-center justify-center'>
                            <div className='text-center opacity-60'>
                                <span className='text-6xl'><i class="fa fa-music"></i></span>
                                <p className='mt-3 text-lg'>Không có bài hát trong playlist của bạn</p>
                            </div>
                        </div>  }
                    </div>
                    <div className='playlist_goiY mt-5'>
                        <p className='text-xl font-semibold capitalize'>Bài hát gợi ý</p>
                        <p className='opacity-60 text-sm'>Dựa trên sự random của code</p>
                        <div className='container_listBaiHatGoiY mt-3'>
                            {renderListSongRandom()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

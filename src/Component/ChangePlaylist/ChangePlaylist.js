import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { CHANGE_PLAYLIST, CLOSE_MODAL, CREATE_PLAYLIST } from '../../Redux/type/Music';

export default function ChangePlaylist(props) {
    const playlistRef = useRef(null);
    const myFormRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const [valueInput, setValue] = useState({
        tenPlaylist: props.namePlaylist,
    })
    const handleOutSideClick = (e) => {
        const { target } = e;
        if (playlistRef.current && !playlistRef.current.contains(target)) {
            dispatch({
                type: CLOSE_MODAL
            })
            document.removeEventListener('mousedown', handleOutSideClick)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutSideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutSideClick)
        }
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: CHANGE_PLAYLIST,
            newPlaylist: {
                oldName: props.namePlaylist,
                newName:valueInput.tenPlaylist,
            }
        })
        myFormRef.current.reset();
        history.push(`/playlist/${valueInput.tenPlaylist}`)
        document.removeEventListener('mousedown', handleOutSideClick)
        // console.log(props.namePlaylist)
        // console.log(valueInput.tenPlaylist)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue({
            [name]: value
        })
    }
    return (
        <div ref={playlistRef} className='createPlaylist'>
            <p>Sửa Playlist</p>
            <div>
                <form ref={myFormRef}>
                    <input name='tenPlaylist' placeholder='Nhập tên playlist' onChange={handleChange} value={valueInput.tenPlaylist}></input>
                </form>
            </div>
            <div>
                {valueInput.tenPlaylist === '' || valueInput.tenPlaylist.trim() === '' ? <button disabled style={{ opacity: "0.6", cursor: 'not-allowed' }}>
                    Sửa
                </button> : <button type='submit' value="Submit" onClick={handleSubmit}>
                    Sửa
                </button>}
            </div>
        </div>
    )
}

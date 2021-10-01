import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { CLOSE_MODAL, CREATE_PLAYLIST } from '../../Redux/type/Music';

export default function NewPlaylist() {
    const playlistRef = useRef(null);
    const myFormRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const [valueInput, setValue] = useState({
        tenPlaylist: '',
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
            type: CREATE_PLAYLIST,
            newPlaylist: {
                name: valueInput.tenPlaylist,
                listBaiHat:[],
            }
        })
        myFormRef.current.reset();
        history.push(`/playlist/${valueInput.tenPlaylist}`)
        document.removeEventListener('mousedown', handleOutSideClick)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue({
            [name]: value
        })
    }
    return (
        <div ref={playlistRef} className='createPlaylist'>
            <p>Tạo playlist mới</p>
            <div>
                <form ref={myFormRef}>
                    <input name='tenPlaylist' placeholder='Nhập tên playlist' onChange={handleChange}></input>
                </form>
            </div>
            <div>
                {valueInput.tenPlaylist === '' || valueInput.tenPlaylist.trim() === '' ? <button disabled style={{ opacity: "0.6", cursor: 'not-allowed' }}>
                    Tạo mới
                </button> : <button type='submit' value="Submit" onClick={handleSubmit}>
                    Tạo mới
                </button>}
            </div>
        </div>
    )
}

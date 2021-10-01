import axios from "axios"
import { GET_LIST_SONG, GET_MP3_SONG, GET_SONG_DETAIL, SONG_DETAIL } from "../type/Music"

export const getListSongAction = ()=>{
    return async disaptch =>{
        try {
            const {data,status} = await axios({
                url:'https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1',
                method:'GET',
            })
            if(status === 200){
                disaptch({
                    type:GET_LIST_SONG,
                    listSong : data.data.song
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const getSongDetailAction = (newSong,typeSong=true) =>{
    return async dispatch =>{
        try {
            const {data,status} = await axios({
                method:'GET',
                url:`https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${newSong.code}`
            })
           if(status === 200){
               console.log(typeSong,'typeSongACtion')
            dispatch({
                type:SONG_DETAIL,
                songDetail:data.data,
                typeSong:typeSong
            })
           }
        } catch (error) {
            console.log(error)
        }
    }
}


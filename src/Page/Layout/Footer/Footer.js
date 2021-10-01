import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { getSongDetailAction } from '../../../Redux/action/ListMusicAction';
import { useSpring, animated, to } from 'react-spring'
import moment from 'moment'


export default function Footer(props) {
    const audioRef = useRef(null);
    const myInput = useRef(null)
    const [timeSong, setTimeSong] = useState(0)
    const [duration, setDuration] = useState(0)
    const [loop, setLoop] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const dispatch = useDispatch();
    let { listSong, songDetail, typeSong } = useSelector(state => state.SongReducer);
    const { listPlaylist } = useSelector(state => state.PlaylistReducer);
    // console.log(props.computedMatch.params.name)
    const changeSong = (thamSo, list = listSong) => {
        if (typeSong === false) {
            const path = props.computedMatch.params.name;
            const index = listPlaylist.findIndex(item => item.name === path)
            if (index !== -1) {
                list = listPlaylist[index].listBaiHat
            }
        }
        console.log(typeSong)
        const baiHatCuoiCung = list[list.length - 1];
        //tim bai dang phat (songDetail) trong list;
        //neu nhu bai nay la index thu = (index = 0) return; ko lam gi ca
        const index = list.findIndex(item => item.id === songDetail.id)
        let baiHatHienTai = {};
        if (index !== -1) {
            if (thamSo === 1) {
                if (list[index].id === baiHatCuoiCung.id) {
                    console.log('Day la bai cuoi cung')
                    return;
                } else {
                    baiHatHienTai = list[index + thamSo]
                }
            } else if (thamSo === -1) {
                if (index === 0) {
                    console.log("Day la bai dau tien")
                    return;
                } else {
                    baiHatHienTai = list[index + thamSo]
                }
            } else {
                return;
            }
        }
        dispatch(getSongDetailAction(baiHatHienTai,typeSong))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (songDetail.source !== undefined) {
            updateSong(`https://vnso-qt-3-tf-${songDetail.source['128']?.slice(2)}`)
            audioRef.current.play()
        }
    }, [songDetail])
    const [audio, setAudio] = useState({
        source: '',
        play: true,
    });
    const updateSong = (source) => {
        setAudio({
            source,
            play: true,
        });
    }
    const spring = useSpring({
        loop: true,
        from: {
            transform: 'rotate(0deg)'
        },
        to: {
            transform: 'rotate(360deg)'
        },
        config: {
            duration: 3000,
        }
    })
    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);
        // audioRef.current.play()
    }
    const handleEnded = () => {
        let list = listSong
        setAudio({
            ...audio,
            play: false
        })
        audioRef.current.pause()
        if (typeSong === false) {
            const path = props.computedMatch.params.name;
            const index = listPlaylist.findIndex(item => item.name === path)
            if (index !== -1) {
                list = listPlaylist[index].listBaiHat
            }
        }
        console.log('typeSong',typeSong)
        console.log(list)
        const baiHatCuoiCung = list[list.length - 1];
        let index = list.findIndex(item => item.id === songDetail.id)
        if (index !== -1) {
            if (shuffle) {
                const random = Math.floor(Math.random() * 100);
                dispatch(getSongDetailAction(list[random],typeSong))
            }
            else if (list[index].id === baiHatCuoiCung.id) {
                console.log("Day la bai hat cuoi cung")
                return;
            } else {
                dispatch(getSongDetailAction(list[index + 1],typeSong));
            }
        }
    }
    return (
        <div className='footer flex px-4 justify-between w-full items-center' style={{ background: 'url(https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-player/zma.png)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <div style={{ width: '30%' }} className='flex footer__left items-center transform translate-x-5 transition-all duration-500 ' >
                <div className='rounded-full border-2 border-white'>
                    <animated.img className='rounded-full imgDetails' onError={e => {
                        e.target.onerror = null;
                        e.target.src = 'https://picsum.photos/400'
                    }} src={songDetail?.thumbnail} alt='hihi' style={audio.play ? spring : {}} >
                    </animated.img>
                </div>
                <div className='ml-3'>
                    <p className='text-white font-semibold'>{songDetail?.name}</p>
                    <p className='text-white opacity-60 hover:text-pink-500 hover:opacity-100'>{songDetail?.artists_names}</p>
                </div>
            </div>
            <div className='footer__center flex flex-col flex-grow'>
                <div className='flex text-white footer__button justify-center'>
                    <button onClick={() => { setShuffle(!shuffle) }}><i className={`fa fa-random ${shuffle ? 'text-pink-500' : ''}`}></i></button>
                    <button onClick={() => {
                       changeSong(-1)
                    }} ><i className="fa fa-arrow-left"></i></button>
                    <button className='button__play' onClick={() => {
                        if (audio.play) {
                            audioRef.current.pause();
                        } else {
                            audioRef.current.play();
                        }
                        setAudio({
                            ...audio,
                            play: !audio.play
                        });
                    }}>  <i className={`fa fa-${audio.play ? 'stop' : 'play'}`}></i>  </button>
                    <button onClick={() => {
                        changeSong(1)
                    }}><i className="fa fa-arrow-right"></i></button>
                    <button onClick={() => { setLoop(!loop) }}><i className={`fa fa-redo ${loop ? 'text-pink-500' : ''}`}></i></button>
                </div>
                <div className='flex flex-1 text-white mt-2'>

                    <span className='cursor-default' >  {moment.utc(timeSong * 1000).format('mm:ss')} </span>
                    {/* background:linear-gradient(to right , $progressbar-active-bg 50% , $progressbar-player-bg 50%  ); */}
                    {/* <div className='progess__bar ' style={{background:`linear-gradient(to right , white ${ timeSong/x*100 }% , hsla(0,0%,100%,0.3) ${100 % - (timeSong/x*100)}%`}}>
                                <div tabindex="0"  aria-valuenow="0" role='slider' draggable='false' aria-valuemax='100' aria-valuemin='0' style={{width:'12px',height:'12px',borderRadius:'50%'}}>

                                </div>
                        </div> */}
                    <input ref={myInput} onChange={(e) => {
                        //    duration 100% , changeValue => value = x%  
                        audioRef.current.currentTime = e.target.value;
                        setTimeSong(e.target.value)
                    }} type='range' className='w-full mx-2' id='myRange' style={{ background: `linear-gradient(to right , white ${timeSong / duration * 100}% , hsla(0,0%,100%,0.3) ${100 % - (timeSong / duration * 100)}%` }} min={0} max={duration} value={timeSong}>
                    </input>
                    <span>
                        {moment.utc(duration * 1000).format('mm:ss')}
                    </span>
                </div>
                {loop ? <audio
                    autoPlay
                    loop
                    ref={audioRef}
                    src={audio.source}
                    onLoadedData={handleLoadedData}
                    onTimeUpdate={() => setTimeSong(audioRef.current.currentTime)}
                    onEnded={handleEnded}
                /> : <audio
                    autoPlay
                    ref={audioRef}
                    src={audio.source}
                    onLoadedData={handleLoadedData}
                    onTimeUpdate={() => setTimeSong(audioRef.current.currentTime)}
                    onEnded={handleEnded}
                />}
            </div>
            <div style={{ width: '30%' }} className='footer__right flex justify-end text-white'>
                <button className='footer__right__button'><i class="fa fa-film "></i></button>
                <button className='footer__right__button'><i class="fa fa-microphone"></i></button>
            </div>
        </div>
    )
}

import React from 'react'

export default function MusicRadio(props) {
    const { item } = props
    return (
        <div className='musicRadio'>
            <div className='musicRedioContent'>
                <img src={item.img} alt={'hihi'} className='w-full'></img>
                <div className='musicRadioOverlay'>
                </div>
                <div className='musicBtn'>
                    <span><i class="fa fa-play"></i></span>
                </div>
            </div>
            <div className='radioIcon'>
                <img src={item.icon} alt='hihiIcon'></img>
            </div>
            <span className='liveRadio'>Live</span>
        </div>
    )
}

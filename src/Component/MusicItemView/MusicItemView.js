import React from 'react'

export default function MusicItemView(props) {
    const {item} = props
    return (
        <div className='musicItemView'>
           <img src={item.img} alt={'hihi'} className='w-full'></img>
           <div className='musicItemOverlay'></div>
           <div className='musicItemBtn'>
                <span><i class="fa fa-heart"></i></span>
                <span><i class="fa fa-play"></i></span>
                <span><i class="fa fa-ellipsis-h"></i></span>
           </div>
        </div>
    )
}

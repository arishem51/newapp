import React from 'react'
import {ArrowLeftOutlined,ArrowRightOutlined,SearchOutlined} from '@ant-design/icons'

export default function Header() {
    
    return (
        <div className='header'>
            <div className='header__content flex justify-between w-full'>
                <div className='header__left    '>
                        <button disabled><ArrowLeftOutlined className='mr-5 flex items-center' style={{fontSize:'24px'}}/></button>
                        <button disabled><ArrowRightOutlined  className='mr-5 flex items-center' style={{fontSize:'24px'}}/></button>
                        <div className='header__search'>
                        <SearchOutlined className='mr-5' style={{fontSize:'24px',position:'absolute',left:'10px'}}/>
                            <input placeholder='Nhập tên bài hát, nghệ sĩ hoặc MV...'>
                            </input>
                        </div>
                </div>
                <div className='header__right flex items-center'>
                    <button className='w-10 h-10 flex items-center mx-2 rounded-full justify-center hover:opacity-80'  ><i class="fa fa-tshirt"></i></button>
                    <button className='w-10 h-10 flex items-center mx-2 rounded-full justify-center hover:opacity-80'  ><i class="fa fa-upload"></i></button>
                    <button className='w-10 h-10 flex items-center mx-2 rounded-full justify-center hover:opacity-80'  ><i class="fa fa-cog"></i></button>
                    <button className='w-10 h-10 flex items-center mx-2 rounded-full justify-center hover:opacity-80' ><div><img className='rounded-full' src='https://s120-ava-talk.zadn.vn/e/1/d/f/2/120/cc60b91b7d678ff12313552fd08b976f.jpg' style={{height:'40px',width:'40px'}} alt='user'></img></div></button>
                </div>
            </div>
        </div>
    )
}

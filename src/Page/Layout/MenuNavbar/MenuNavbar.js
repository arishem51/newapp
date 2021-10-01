import React from 'react'
import { UserOutlined, LoadingOutlined, CodepenCircleOutlined, TeamOutlined, SmileOutlined, PlayCircleOutlined, AliwangwangOutlined, CustomerServiceOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import NewPlaylist from '../../../Component/NewPlaylist/NewPlaylist';
import { OPEN_MODAL } from '../../../Redux/type/Music';
export default function MenuNavbar() {
    const dispatch = useDispatch();
    const {listPlaylist} = useSelector(state => state.PlaylistReducer);

    const handleScroll = (e) => {
        e.target.classList.add('isScroll');
        if (e.target.scrollTop > 10) {
            e.target.classList.add('isScroll');
        } else {
            e.target.classList.remove('isScroll');
        }
    }
    const handleClick = ()=>{
        dispatch({
            type:OPEN_MODAL,
            Component:<NewPlaylist></NewPlaylist>
        })
    }
    return (
        <div className='sideBar' >
            <div className='logoMp3'>
                <img src='https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg' alt='logo'></img>
            </div>
            <div className='sideBar__menu'>
                <ul>
                    <NavLink exact to='/profile'  activeClassName='activeLi'><li><i ><SmileOutlined className='block' /></i>Cá Nhân</li></NavLink>
                    <NavLink exact to='/newapp' activeClassName='activeLi'><li><i ><PlayCircleOutlined className='block' /></i>Khám Phá</li></NavLink>
                    <li ><i> <AliwangwangOutlined className='block' /> </i> #Zingchart</li>
                    <li><i><CustomerServiceOutlined className='block' /></i>Radio & Podcast <span className='mt-1 ml-2'><img src='https://zjs.zadn.vn/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg' alt='liveLogo'></img></span></li>
                    <li><i ><TeamOutlined className='block' /></i>Theo Dõi</li>
                </ul>
            </div>
            <div className='gach'>
            </div>
            <div className='sideBar__music'>
                <div className='sideBar__menu2 mt-3' onScroll={handleScroll}>
                    <ul className='mt-2'>
                        <li><i ><SmileOutlined className='block' /></i>Nhạc Mới</li>
                        <li><i ><PlayCircleOutlined className='block' /></i>Thể Loại</li>
                        <li><i> <AliwangwangOutlined className='block' /> </i>Top 100</li>
                        <li><i><CustomerServiceOutlined className='block' /></i>MV<span className='mt-1 ml-2'></span></li>
                    </ul>
                    <div className='sideBar__banner'>
                        <p>Nghe nhạc không quảng cáo cùng kho nhạc VIP</p>
                        <button>Mua vip</button>
                    </div>
                    <div className='sideBar__category'>
                        <div className='sideBar__text'>
                            <p>THƯ VIỆN</p>
                            <i class="fa fa-pen"></i>
                        </div>
                        <div>
                            <ul className='mt-2'>
                                <li><i ><SmileOutlined className='block' /></i>Bài hát</li>
                                <li><i ><PlayCircleOutlined className='block' /></i>Playlist</li>
                                <li><i> <AliwangwangOutlined className='block' /> </i>Album</li>
                                <li><i><CustomerServiceOutlined className='block' /></i>Nhạc tải lên<span className='mt-1 ml-2'></span></li>
                                <li><i> <AliwangwangOutlined className='block' /> </i>Gần đây</li>
                            </ul>
                        </div>
                    </div>
                    <div className='sideBar__playlist'>
                            {listPlaylist.map((item,index)=>{
                                return <div key={index} className='playlist_item opacity-70 hover:opacity-100'>
                                    <NavLink to={`/playlist/${item.name}`} style={{width:'100%',height:'100%',fontSize:'14px'}}>{item.name}</NavLink>
                                </div>
                            })}
                    </div>
                </div>
            </div>
            <div className='sideBar__footer cursor-pointer' onClick={handleClick}>
                <span><i class="fa fa-plus mr-2"></i>Tạo playlist mới</span>
            </div>
        </div>
    )
}

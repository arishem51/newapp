import { Route } from "react-router";
import MenuNavBar from '../../Page/Layout/MenuNavbar/MenuNavbar'
import ListMusic from '../../Page/Layout/ListMusic/ListMusic'
import Header from '../../Page/Layout/Header/Header'
import Footer from "../../Page/Layout/Footer/Footer";


export const HomeTemplate  = (props)=>{
    const {Component,...restProps} = props;
    return <Route  {...restProps} render={(propsRouter)=>{
        return <div className='flex overflow-hidden'  style={{backgroundImage:'url(https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/zma.svg)',height:'100%'}}>
                <MenuNavBar ></MenuNavBar>
                <div>
                    <Header></Header>
                    <Component {...propsRouter}></Component>
                </div>
                <ListMusic ></ListMusic>
                <Footer></Footer>
        </div>
    }}></Route>
}
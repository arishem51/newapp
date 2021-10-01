import logo from './logo.svg';
import './App.scss';
import {Router,Switch,Route} from 'react-router-dom'
import { HomeTemplate } from './Template/HomeTemplate/HomeTemplate';
import KhamPha from './Component/KhamPha/KhamPha';
import Profile from './Component/Profile/Profile'
import { createBrowserHistory } from 'history';
import Playlist from './Page/Layout/Playlist/Playlist';
import HOCplaylist from './HOC/HOCplaylist';



export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <HOCplaylist></HOCplaylist>
      <Switch>
        <HomeTemplate exact path='/playlist/:name' Component={Playlist}></HomeTemplate>
        <HomeTemplate exact path='/newapp' Component={KhamPha}></HomeTemplate>
        <HomeTemplate exact path='/profile' Component={Profile}></HomeTemplate>
      </Switch>
    </Router>
  );
}

export default App;

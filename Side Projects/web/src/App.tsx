/* eslint-disable no-unreachable */
import React, { Fragment, useState } from 'react';
import './App.scss';
import logo from './quizr-logo.png';
import {
  BrowserRouter as Router, Link, Switch, Route,
  Redirect, useHistory
} from 'react-router-dom';
import { createContainer } from "unstated-next"


// Begin route imports
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/UsersList';
import { Login } from './pages/Login'; 
import { Admin } from './pages/Admin'
import { About } from './pages/About'
import {Guest} from './pages/Guest'
// End route imports

// Context state wrapper
function useAppState(initialState = false) {
  let [isLoggedIn, setIsLoggedIn] = useState(initialState)
  let [sideBarState, setSetSideBarState] = useState<boolean>(false)
  let [activePage, setActivePage] = useState<string>("/")
  let [profileMenu, setProfileMenu] = useState<boolean>(false)

  // Not sure what this part does??
  let setLoggedInStatus = (val: boolean) => setIsLoggedIn(val)

  return {
    isLoggedIn, setLoggedInStatus,
    sideBarState, setSetSideBarState,
    activePage, setActivePage,
    profileMenu, setProfileMenu,
  }
}

export let AppState = createContainer(useAppState)


const TopBar = () => {
  let appState = AppState.useContainer()
 

  
  return (
    <div className="TopBar">
      <div className="TBLeft">
        <span onClick={() => { appState.setSetSideBarState(!appState.sideBarState) }}
          className="material-icons md-light md-48">
          menu
        </span> 
      </div>
      <div className="TBCenter">
        <img className="logo" alt="logo" src={logo}/>
      </div>
      <div className="TBRight">
        <span onClick={() => { appState.setProfileMenu(!appState.profileMenu) }}
          className="material-icons md-light md-48">
          account_circle
        </span>
      </div>
    </div>
  );
};

const ProfilePopup = () => {
  let appState = AppState.useContainer()


  if (appState.profileMenu) {
    return (
      
      <span onMouseLeave={
        () => appState.setSetSideBarState(!appState.profileMenu)} className="ProfilePopup">
        
        
        {/* Close button */}
        <i onClick={
          () => appState.setSetSideBarState(!appState.profileMenu)
        } className="material-icons md-light md-48">close</i>
      </span>
    )
  } else return <span></span>
}

const SideBar = () => {
  let appState = AppState.useContainer()
  // History routing
  let history = useHistory();
  
  
  if (appState.sideBarState) {
  return (
    
    <div onMouseLeave={
      () => appState.setSetSideBarState(!appState.sideBarState)} className="SideBar">
      
      
      {/* Close button */}
      <i onClick={
        () => appState.setSetSideBarState(!appState.sideBarState)
      } className="material-icons md-light md-48">close</i>
      
      
      
      {/* Add nav list */}
      <div className="NavList">
        <button className="NavBtn" onClick={() => { history.push('/admin') }}
          >Admin</button>
        <button className="NavBtn" onClick={() => { history.push('/users') }}
          >Users</button>
        <button className="NavBtn" onClick={() => { history.push('/dashboard') }}
          >Dashboard</button>
        <button className="NavBtn" onClick={() => { history.push('/guest') }}
          >Guest</button>
        <button className="NavBtn" onClick={() => { history.push('/') }}
          >Home</button>
      </div>
      

 

      {/* End Side Bar <div> */}
    </div>)
    } else {
        return <div></div>
  }
}


  

const MainFrame = () => {
  return (
    
      <Switch>
      <Route path="/dashboard">
          <Dashboard />
      </Route>
      <Route path="/admin">
          <Admin />
      </Route>
      <Route path="/users">
          <Users />
      </Route>
      <Route path="/login">
          <Login />
      </Route>
      <Route path="/about">
          <About />
      </Route>
      <Route path="/Guest">
        <Guest />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
      </Switch>
      
        )
}

const Routes = () => {
  // This holds the Main Page elements, Landing page will need to be added
  // If we put some state based conditional rendering in here we don't have to repeat as many components on other pages
  // I hope?
    return (
      <React.Fragment>
        <SideBar /> 
        <TopBar />
        <ProfilePopup />
        <MainFrame /> 
      </React.Fragment>
    )
  }

function App() {
  return (
    <AppState.Provider>
      <div className="App">
      <Router>
          <Routes />
      </Router> 
      </div>
    </AppState.Provider>
  );
}

export default App;

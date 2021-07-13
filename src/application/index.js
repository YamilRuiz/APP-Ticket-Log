import React from 'react';
import {UsersContext} from '../contexts/UserContext'
import App from './App'

function AppDisplay() {
    return (
        <UsersContext.Consumer>{(
            {user,setUser,setLogs,userLogs, setloggedIn, loggedIn})=>
            (<App user={user} loggedIn={loggedIn} setUser={setUser} setLogs={setLogs} userLogs={userLogs} setloggedIn={setloggedIn} />)}
        </UsersContext.Consumer>        
    );
  }
  export default AppDisplay;
import React from 'react';
import {UsersContext} from '../contexts/UserContext'
import App from './App'

function AppDisplay() {
    return (
        <UsersContext.Consumer>{(
            {user,setUser,setLogs,userLogs})=>
            (<App user={user} setUser={setUser} setLogs={setLogs} userLogs={userLogs}/>)}
        </UsersContext.Consumer>        
    );
  }
  export default AppDisplay;
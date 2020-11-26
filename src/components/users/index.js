import React from 'react';
import {UsersContext} from '../../contexts/UserContext'
import UserMain from './userMain';

function UserDisplay() {
    return (
        <UsersContext.Consumer>{(
            {user,setUser,setLogs,userLogs})=>
            (<UserMain user={user} setUser={setUser} setLogs={setLogs} userLogs={userLogs}/>)}
        </UsersContext.Consumer>        
    );
  }
  export default UserDisplay;
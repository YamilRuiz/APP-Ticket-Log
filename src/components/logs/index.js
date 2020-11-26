import React from 'react';
import {UsersContext} from '../../contexts/UserContext'
import LogList from './logList';

function LogLists() {
    return (
          <UsersContext.Consumer>{(
            {user,setUser,userLogs})=>
            (<LogList user={user} setUser={setUser} userLogs={userLogs}/>)}
          </UsersContext.Consumer>        
    );
  }
  export default LogLists;
import React from 'react';
import {UsersContext} from '../../contexts/UserContext'
import LogList from './logList';

function LogLists() {
    return (
          <UsersContext.Consumer>{(
            {user,setUser,userSites})=>
            (<LogList user={user} setUser={setUser} userSites={userSites}/>)}
          </UsersContext.Consumer>        
    );
  }
  export default LogLists;
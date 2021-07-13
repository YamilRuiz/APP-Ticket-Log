import React from 'react';
import {UsersContext} from '../../contexts/UserContext'
import TheMap from './map';

function Map() {
    return (
          <UsersContext.Consumer>{(
            {user,setUser,userLogs,clickLog,setClickLog})=>
            (<TheMap user={user} setUser={setUser} userLogs={userLogs} />)}
          </UsersContext.Consumer>        
    );
  }
  export default Map;
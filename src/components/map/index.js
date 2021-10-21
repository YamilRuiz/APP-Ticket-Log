import React from 'react';
import {UsersContext} from '../../contexts/UserContext'
import TheMap from './map';

function Map() {
    return (
          <UsersContext.Consumer>{(
            {user,setUser,userSites,clickLog,setClickLog})=>
            //Need corrections on usersites
            (<TheMap user={user} setUser={setUser} userSites={userSites} />)}
          </UsersContext.Consumer>        
    );
  }
  export default Map;
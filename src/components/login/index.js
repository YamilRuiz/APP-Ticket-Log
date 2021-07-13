import React from 'react';
import {UsersContext} from '../../contexts/UserContext'
import Login from './login.component';

function LoginForm() {
    return (
        <UsersContext.Consumer>{(
            {user,setUser,setUserLogs,setUserSites,setloggedIn})=>
            (<Login user={user} setUser={setUser} setUserLogs={setUserLogs} 
            setUserSites={setUserSites} setloggedIn={setloggedIn} />)}
          </UsersContext.Consumer>        
    );
  }
  export default LoginForm;
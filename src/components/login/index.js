import React from 'react';
import {UsersContext} from '../../contexts/UserContext'
import Login from './login.component';

function LoginForm() {
    return (
        <UsersContext.Consumer>{(
            {user,setUser})=>
            (<Login user={user} setUser={setUser} />)}
          </UsersContext.Consumer>        
    );
  }
  export default LoginForm;
import React from 'react';
import {UsersContext} from '../../contexts/UserContext'
import NavStatus from './navbar';

function NavDisplay() {
    return (
        <UsersContext.Consumer>{(
            {user, setloggedIn, loggedIn})=>
            (<NavStatus user={user} loggedIn={loggedIn} setloggedIn={setloggedIn} />)}
        </UsersContext.Consumer>        
    );
  }
  export default NavDisplay;
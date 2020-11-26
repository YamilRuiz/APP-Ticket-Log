import React from 'react';
import {UsersContext} from '../../contexts/UserContext'
import AddForm from './addlog';

function AddLogForm() {
    return (
        <UsersContext.Consumer>{(
            {user,setUser})=>
            (<AddForm user={user} setUser={setUser} />)}
          </UsersContext.Consumer>        
    );
  }
  export default AddLogForm;
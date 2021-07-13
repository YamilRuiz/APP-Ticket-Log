import React from 'react';
import {UsersContext} from '../../contexts/UserContext'
import AddForm from './addlog';

function AddLogForm(props) {
    return (
        <UsersContext.Consumer>{(
            {user,setUser, props})=>
            (<AddForm user={user} setUser={setUser}open={props} />)}
          </UsersContext.Consumer>        
    );
  }
  export default AddLogForm;
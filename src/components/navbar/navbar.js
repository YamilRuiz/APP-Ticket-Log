import React,{Fragment} from "react";
import {Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';



function NavStatus(props){
    const logout=function  (){
        axios.get('http://localhost:5000/users/logout')
        props.setloggedIn(false)
    }
    
    const logged=props.loggedIn
      if (logged){
        return(
         <Button color="inherit" onClick={logout}  component={RouterLink} to="/">Logout</Button>
        )        
      }else{
       return(
         <Fragment>
           <Button color="inherit" component={RouterLink} to="/login" >Login</Button>
           <Button color="inherit" component={RouterLink} to="/register">Register</Button>
         </Fragment>
       )
      } 
 }


 export default NavStatus
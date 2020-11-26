import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import Axios from 'axios';
import Display from './display';




class UserMain extends Component{
    constructor(props){
        super (props);

        this.state={
            user:'',
            redirect:false,
            logs:this.props.userLogs
            }
    }
    componentDidMount(){
        //Completed User logged in check with redirection to Login if not a match with url 4/27/2020
        Axios.get('http://localhost:5000/users/check',{withCredentials:true})
        .then (response=>{            
            if (response.data!==this.props.match.params.user){                
                this.setState({redirect:true});            
            }else{
                this.setState({
                    user:response.data
                })               
            }
        })       
        .catch( error=>{console.log(error)})       
    }
  
    render(){
            if (this.state.redirect){
                const baseUrl= "/login";
                return (<Redirect push to={baseUrl} />)
            }else{
                return(       
                        <Display />                        
                )
            }       
    }
}

export default withRouter(UserMain)
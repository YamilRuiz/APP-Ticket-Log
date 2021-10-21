import React, { Component } from "react";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';


const style = theme=>( {
    root:{       
        maxWidth: 500,
        minWidth:400,
        margin:'auto',
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius:5,
        margin:"10% 0"
    },
    form:{
       display:'grid'
    },
    texInputs:{
        padding:5
    }
  });

class Registration extends Component{
    constructor(props){
        super(props);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            username:'',
            password:''
        };
    }
    onSubmit(e){
        e.preventDefault();
        const user={
            username:this.state.username,
            password:this.state.password
        }
        axios.post('http://localhost:5000/users/register',user)
            .then(function(response){
                console.log(response)
                if (response.status === 200){
                    window.location="/login";
                }
            })
            .catch (error=>{
                if(error){
                    alert('Something went wrong with registration, Please Try again!!')
                    window.location="/register";
                }
            })
            this.setState({
                username:'',
                password:''
            })
    }
    onChangeUsername(e){
        this.setState({
            username:e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }

    render(){
        const {classes}=this.props
        return(
            <div className={classes.root}>
            <Typography variant="h6" className={classes.title}>
            AT&T Network Log Registration
            </Typography>
            <form className={classes.form} onSubmit={this.onSubmit} validate='true' autoComplete="off">                       
                    <TextField className={classes.texInputs}
                        required
                        id="user"
                        label="User"
                        type="string"
                        placeholder="attuid"
                        onChange={this.onChangeUsername}
                    /> 
                    <TextField className={classes.texInputs}
                        required
                        id="password"
                        type="string"
                        label="Password"
                        placeholder="password"
                        onChange={this.onChangePassword}
                    />           
                    <ButtonBase type='submit'>
                    <Button onclassName={classes.texInputs} onClick={this.onSubmit}
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        SEND
                    </Button>
                    </ButtonBase>                        
            </form>
        </div>
        )
    }
}

export default withStyles(style)(Registration)
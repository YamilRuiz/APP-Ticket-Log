import React,{Component}from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
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
        borderRadius:5
    },
    form:{
       display:'grid'
    },
    texInputs:{
        padding:5
    },
    tittle:{
        margin:'auto'
    }
  });
class Login extends Component{
    constructor(props){        
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.state={
            username:'',
            password:'',
            fail:'',
            redirect: false,
            user:''           
        }      
    }    
    onSubmit(e){
        e.preventDefault();        
        axios.post('http://localhost:5000/users/login',{
            username: this.state.username,
            password:this.state.password
        },{withCredentials:true})
        .then (response=>{
            if (response.status===200){
                this.props.setUser(response.data.username)
                this.setState({
                    user:response.data.username,
                    redirect:true                    
                })
                }           
        })
        .catch (error=>{
            if(error){
                console.log(error)
            this.setState({fail:'Something went wrong, Check your User or Password!!!'})
            }
            alert(this.state.fail)
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
        if (this.state.redirect){
            const baseUrl="/network_log/";
            const addOnUrl=this.state.user
            return <Redirect push to={baseUrl+addOnUrl}/>
        }else{
            return( 
                    <div className={classes.root}>
                   
                    <form className={classes.form} validate='true' autoComplete="off">
                    <Typography variant="h6" className={classes.title}>
                      AT&T Network Log Sign in
                    </Typography>                       
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
                                id="ticketNumber"
                                type="string"
                                label="Password"
                                placeholder="password"
                                onChange={this.onChangePassword}
                            />
                                                           
                           
                            <ButtonBase type='submit' onSubmit={this.onSubmit}>
                            <Button onclassName={classes.texInputs}
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                                Login
                            </Button>
                            </ButtonBase>                        
                    </form>
                </div>
              
            )
            }
    }
}

export default withStyles(style)(Login)
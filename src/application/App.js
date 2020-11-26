import React,{Component, Fragment}  from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import {Link as RouterLink} from 'react-router-dom'
import Registration from '../components/registration/registration.component';
import LoginForm from '../components/login/index.js';
import UserDisplay from '../components/users/index';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddLogForm from '../components/addLog/index';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import cover from '../images/cover.jpg'

const style = theme=>( {
  root: {
    backgroundColor: 'blue',
  },
  leftPane: {
    margin:20  
  },
  title: {
    flexGrow: 1,
  },
  
  middle:{
    display:'flex',
    backgroundImage: 'url('+cover+')',
    backgroundColor:'black',
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center center",
		backgroundSize: "cover",
		backgroundAttachment: "fixed",
    height:600,
    padding:10,
    alignContent:'auto'
 },
 footer:{
    height:250
 }
});


function NavStatus(props){
   const logged=props.logged
   
     if (logged){
       return(
        <Button color="inherit">Logout</Button>
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

 class App extends Component{
  constructor(props){
        
    super(props);
    
    this.state={
        logged:false
    }      
  } 
  componentDidMount(){
    //Completed User logged in check with redirection to Login if not a match with url 4/27/2020
    axios.get('http://localhost:5000/users/firstcheck',{withCredentials:true})
    .then (response=>{
        if (response.status===200){
          this.setState({logged:true})
        }else{
          this.setState({logged:false}) 
        }       
    })       
    .catch( error=>{console.log(error)})        
}
  render(){
    const {classes}=this.props;
    const loggedin = this.state.logged;
    return (
      <Router>          
         <div >
          <Grid container >
            <Grid item xs={12}>
              <Paper>
                <AppBar position="static" className={classes.root}>
                  <Toolbar>                  
                    <Typography variant="h6" className={classes.title}>
                      AT&T Network Log
                    </Typography>
                    <NavStatus logged={loggedin}/>
                  </Toolbar>
                </AppBar>
              </Paper>
            </Grid>         
          </Grid>
        </div>
        <Grid  item xs={12} sm={12}>
              <Paper className={classes.middle} >
                <Route exact path="/Network_Log" />
                <Route exact path="/register" component={Registration}/>
                <Route exact path="/login" component={LoginForm}/>
                <Route exact path="/addlog" component={AddLogForm}/>
                <Route exact path="/Network_Log/:user" component={UserDisplay}/>               
              </Paper>
        </Grid>          
   
          <Grid item xs={12} sm={12}>
              <Paper className={classes.footer} elevation={0}>Footer</Paper>
          </Grid>
      </Router>
    );
  }
}

export default withStyles(style)(App);
 
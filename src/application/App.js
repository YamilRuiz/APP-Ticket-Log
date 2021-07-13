import React,{Component}  from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Registration from '../components/registration/registration.component';
import LoginForm from '../components/login/index.js';
import UserDisplay from '../components/users/index';
import NavDisplay from '../components/navbar/index';
import HomeCard from '../components/home/home';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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

  middleContainer:{
    backgroundImage: 'url('+cover+')',
    backgroundColor:'black',
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center center",
		backgroundSize: "cover",
		backgroundAttachment: "fixed",
    justifyContent:"center",
    width:"100%"
 },
 footer:{
    height:250,
    backgroundColor:'gray',
    width:"100%"
 },
 gridCard:{
  justifyContent:"center"
}
});


 class App extends Component{ 

  componentDidMount(){
    axios.get('http://localhost:5000/users/check',{withCredentials:true})
    .then (response=>{
        if (response.data ==="valid"){
          this.props.setloggedIn(true)
        }else{
          this.props.setloggedIn(false)
        }      
    })       
    .catch( error=>{console.log(error)})        
  }
  // Need to remove adddlog route since addlog form is now a modal 01/102021
  render(){
    const {classes}=this.props;
    return (
      <Router>          
         
          <Grid container >
            <Grid item xs={12}>
              <Paper>
                <AppBar position="static" className={classes.root}>
                  <Toolbar>                  
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit" component={RouterLink} to="/">AT&T Network Log</Button>
                    </Typography>
                    <NavDisplay />
                  </Toolbar>
                </AppBar>
              </Paper>
            </Grid>         
          </Grid>
       
        <Grid container xs={12} sm={12} alignContent='center' className={classes.middleContainer}>
              <Grid container  xs={12} className={classes.gridCard}>
                <Route exact path= "/" component= {HomeCard} />
                <Route path="/network_log" component={HomeCard} />
                <Route exact path="/register" component={Registration}/>
                <Route exact path="/login" component={LoginForm}/>
                <Route exact path="/Network_Log/:user" component={UserDisplay}/>               
              </Grid>
        </Grid>          
   
          <Grid container xs={12} sm={12}>
              <Paper className={classes.footer} elevation={0}>Site Map Information </Paper>
          </Grid>
      </Router>
    );
  }
}

export default withStyles(style)(App);
 
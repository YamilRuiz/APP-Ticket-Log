import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import LogLists from '../logs';
import TheMap from '../map'


const style = theme=>( {
  root: {
    backgroundColor: 'blue',
    overflow:'hidden',
    maxHeight:'500px'
  },
  
});
function Display (props){
  const {classes}=props
    return(
        <Grid container spacing={3}>
            <Grid item xs={12} sm={3} >              
              <Paper className={classes.root}>
                  <LogLists  />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={9} >
              <Paper>
                <TheMap />
              </Paper>
            </Grid>
        </Grid>
    )
}

export default withStyles(style)(Display);
   
import React,{Fragment} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import { withStyles } from '@material-ui/core/styles';

const style= theme=>({
   paperTile:{
       height:"400px",
       margin:"10% 0 10% 0",
       opacity:"0.9",
       backgroundColor: '#f5f5f5'
   },
   paperTitle:{
       display:"flex",
       justifyContent:"center",
       alignItems:"center"
   }
})

function homeCards(props){
    const {classes}=props;
    return(
        <Fragment>
            <Grid item >
                <Paper elevation={3} className={classes.paperTile}>
                    <div className={classes.paperTitle}>
                        <Typography variant="h6" >
                            Network Log Application
                        </Typography>
                    </div>
                    <hr/>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <StarIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                You will be able to Log you activity daily.
                            </ListItemText>                            
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <StarIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Activity will be map
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <StarIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Will be able to see and edit the activity
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <StarIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Reminder will be sent for review
                            </ListItemText>
                        </ListItem>
                    </List>
                </Paper>
            </Grid>
        </Fragment>
    )
}

export default withStyles(style)(homeCards);
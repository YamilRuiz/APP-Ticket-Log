import React, {Fragment,useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MoreIcon from '@material-ui/icons/More';
import Typography from '@material-ui/core/Typography';
import LogCard from '../modal/modal';
import AddLog from '../addLog/addlog'

const style= theme=>({
    title:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logTitle:{
        paddingLeft: 10
    }
})
function LogList(props){
    const {user,userSites}=props
    const [open,setOpen]= useState(false)
    const [selectedLog, setSelectedLog]= useState({})
    const [addLogOpen, setAddLogOpen]= useState(false)
    const {classes}=props
// Redirect not working will research more or change to a modal

    return(
        <Fragment>
        <div className={classes.title}>
            <Typography
            className={classes.logTitle}
            variant='h6'
            color='inherit'>
            Your Logs
            </Typography>
            <IconButton>
                <AddIcon
                    fontSize='large'
                    onClick={()=>setAddLogOpen(true)}
                />
            </IconButton>
        </div>       
        <List >
                {userSites[0].userLogs.map((log,index)=>{
                    return(                        
                        <ListItem
                            key={index}
                            button
                            onClick={()=> console.log(log.site)}                           
                            >
                            <ListItemText primary={log.site}
                                 />                                
                                <ListItemSecondaryAction>                        
                                    <IconButton                                           
                                         onClick={()=> {return setSelectedLog(log), setOpen(true)}}>                                          
                                        <MoreIcon                                            
                                         />                                
                                    </IconButton>
                                </ListItemSecondaryAction>                            
                        </ListItem>
                    )
                }
                )}     
        </List>
        <LogCard user={user} open={open} setOpen={setOpen} selectedLog={selectedLog} />
        <AddLog addLogOpen={addLogOpen} user={user} setAddLogOpen={setAddLogOpen}/>
        
        </Fragment>
    )

}


export default withStyles(style)(LogList);
import React, {Fragment,useState} from 'react';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MoreIcon from '@material-ui/icons/More';
import Typography from '@material-ui/core/Typography';
import LogCard from '../modal/modal'


function LogList(props){
    const {user,userLogs}=props
    const [open,setOpen]= useState(false)
    const [selectedLog,setSelectedLog]= useState({})
   
 
    return(
        <Fragment>
        <div>
            <Typography
            variant='h6'
            color='inherit'>
            Your Logs
            </Typography>
        </div>       
        <List >
                {userLogs.map((log,index)=>{
                    return(                        
                        <ListItem
                            key={index}
                            button
                            
                            >
                            <ListItemText primary={log.ticket+"   "+log.site} />                                
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
        
        </Fragment>
    )

}


export default LogList;
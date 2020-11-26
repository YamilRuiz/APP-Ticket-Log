import React from 'react';
import { Dialog, Card, CardContent, CardActions } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';


function LogCard (props){   
const {user,open,setOpen, selectedLog}=props
const initial= user.charAt(0).toUpperCase()
const handleClose=()=>{
    setOpen(false);
}
    return(
        <Dialog open={open} >
            <Card>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" >
                        {initial}
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={selectedLog.site}
                    subheader={selectedLog.ticket}
                />
                <CardContent>
                    <p>{selectedLog.description}</p>
                </CardContent>
                <CardActions>
                    <IconButton
                        onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </CardActions>                
            </Card>
        </Dialog>
    
    )   
}

export default LogCard
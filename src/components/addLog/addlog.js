import React,{Component}from "react";
import axios from 'axios';
import { Dialog} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';


//Need to change all to adapt to add log form
const reload=()=>window.location.reload();
const style = theme=>( {
    root:{       
        maxWidth: 500,
        minWidth:375,
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
    button:{
        display:'flex',
        justifyContent: 'space-evenly',
        marginTop:10
    }
  });

class AddForm extends Component{
    constructor(props){       
        super(props);
       this.handleSwitchChange=this.handleSwitchChange.bind(this)
       this.onChangeTicket=this.onChangeTicket.bind(this);
       this.onChangeSite=this.onChangeSite.bind(this);
       this.onChangeLat=this.onChangeLat.bind(this);
       this.onChangeLng=this.onChangeLng.bind(this);
       this.onChangeDesc=this.onChangeDesc.bind(this);
       this.onSubmit=this.onSubmit.bind(this);       
        this.state={
            fail:'',                 
            redirect: false,
            tech:this.props.user,
            pending: false,
            ticket:'',
            site:'',
            lat:0,
            lng:0,
            description:''
        }              
    }
   
    
    onSubmit(e){
        e.preventDefault();
        // Function to add site to user document
        function addSite(){
            return axios.post('http://localhost:5000/users/addsite',{
                tech:this.state.tech,
                site:this.state.site,
                lat:this.state.lat,
                lng:this.state.lng,
                hidden:false,
                bounce:false
                },{withCredentials:true})
        }
        // Function to add log to logs documents
        function postLog(){
            return axios.post('http://localhost:5000/logs/add',{
            tech:this.state.tech,
            pending:this.state.pending,
            ticket:this.state.ticket,
            site:this.state.site,
            lat:this.state.lat,
            lng:this.state.lng,
            description:this.state.description
            },{withCredentials:true})            
        }
        // Need to change logic of redirecting since was converted to a modal
        axios.all([postLog(),addSite()])
            .then(responseArr=>{
                if (responseArr[0].status===200){
                    this.props.setAddLogOpen(false);
                    reload();
                }
            })
            .catch (error=>{
                if(error){
                    console.log(error)
                this.setState({fail:'Something went wrong, Log not saved'})
                }
                alert(this.state.fail)
            })
        this.setState({
            ticket:'',
            site:'',
            lat:0,
            lng:0,
            pending:false,
            description:''
        })
    }
    handleSwitchChange(e){
       e.target.checked ? this.setState({
           pending:true
       }) : this.setState({pending:false})      
   }
   onChangeTicket(e){    
    this.setState({
        ticket:e.target.value
    })
    }
    onChangeSite(e){    
        this.setState({
            site:e.target.value
        })
    }
    onChangeLat(e){    
        this.setState({
            lat:e.target.value
        })
    }
    onChangeLng(e){    
        this.setState({
            lng:e.target.value
        })
    }
    onChangeDesc(e){    
        this.setState({
            description:e.target.value
        })
    }
    render(){
        const {classes}=this.props
            return(
                <Dialog open={this.props.addLogOpen}>
                <div className={classes.root}>
                        <Typography variant="h6" className={classes.title}>
                            Create Log
                        </Typography>
                        <form className={classes.form} validate='true' autoComplete="off">                       
                                <TextField className={classes.texInputs}
                                    id="user"
                                    label="User"
                                    type="string"
                                    value={this.state.tech}                                
                                    InputLabelProps={{
                                        readOnly: true,
                                    }}
                                /> 
                                <TextField className={classes.texInputs}
                                    required
                                    id="ticketNumber"
                                    type="string"
                                    label="Ticket Number"
                                    placeholder="TT0000000000"
                                    onChange={this.onChangeTicket}
                                />
                                <TextField className={classes.texInputs}
                                    required
                                    id="site"
                                    label="site"
                                    type="string"
                                    placeholder="dxl00000"
                                    onChange={this.onChangeSite}
                                />
                                <TextField className={classes.texInputs}
                                    required 
                                    id="lat" 
                                    label="Latitude" 
                                    placeholder="32.1234566"
                                    onChange={this.onChangeLat}
                                />
                                <TextField className={classes.texInputs}
                                    required 
                                    id="lng" 
                                    label="Longitude" 
                                    placeholder="-97.023145"
                                    onChange={this.onChangeLng}
                                />
                                <TextField className={classes.texInputs} 
                                    required 
                                    id="description" 
                                    label="Description"
                                    type="string"
                                    multiline
                                    rowsMax={4} 
                                    placeholder="Explain Work"
                                    onChange={this.onChangeDesc}                        
                                />                                                   
                                <FormControlLabel className={classes.texInputs}
                                    control={<Switch 
                                    size="small"
                                    color="primary"
                                    name="pending" />}
                                    label="Pending Work?"
                                    onChange={this.handleSwitchChange}
                                />
                                <div className={classes.button}>
                                    <ButtonBase type='submit' onSubmit={this.onSubmit}>
                                        <Button onclassName={classes.texInputs}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            startIcon={<SaveIcon />}
                                        >
                                            Save
                                        </Button>
                                    </ButtonBase>
                                    <ButtonBase  onClick={()=>this.props.setAddLogOpen(false)}>
                                        <Button onclassName={classes.texInputs}
                                            variant="contained"
                                            color="secondary"
                                            size="small"                                >
                                            Cancel
                                        </Button>
                                    </ButtonBase>
                                </div>                      
                        </form>                    
                    </div>
                </Dialog>
            )
    }
}

export default withStyles(style)(AddForm)
import React,{Component}from "react";
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TheMap from "../map/map";

//Need to change all to adapt to add log form

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
            tech:'',
            pending: false,
            ticket:'',
            site:'',
            lat:0,
            lng:0,
            description:''   
        }
        console.log(this.props)               
    }
    componentDidMount(){
       
        //Need to correct code to redirect to mainpage in case user is not logged in 6/6/2020
        axios.get('http://localhost:5000/users/firstcheck',{withCredentials:true})
        .then (response=>{            
            if (response.data!==this.props.user){                
                this.setState({redirect:true});                            
            }else{
                this.setState({
                    tech:this.props.user
                })
            }
        })       
        .catch( error=>{console.log(error)})
        
    }
    
    onSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:5000/logs/add',{
            tech:this.state.tech,
            pending:this.state.pending,
            ticket:this.state.ticket,
            site:this.state.site,
            lat:this.state.lat,
            lng:this.state.lng,
            description:this.state.description

        },{withCredentials:true})
        .then(response=>{
            if (response.status===200){
                this.setState({
                    redirect:true                    
                })
                const baseUrl="/network_log/";
                const addOnUrl=this.state.tech
                return <Redirect push to={baseUrl+addOnUrl}/>
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
                    </form>
                    <TheMap />
                </div>
            )
    }
}

export default withStyles(style)(AddForm)
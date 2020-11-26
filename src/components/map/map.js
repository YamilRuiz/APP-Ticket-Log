
import React,{Component} from "react"
import {GoogleMap, Marker} from "@react-google-maps/api"


const Data=[
    { site:'DXL01234',lat:32.884254, lng:-97.276890,visible:true,bounce:false},
    { site:'DXL01238',lat:32.883707, lng:-97.275264,visible:true,bounce:false},
    { site:'DXL01235',lat:32.885096, lng: -97.269809,visible:true,bounce:true}
]


const containerStyle = {
  width: '100%',
  height: '400px'
};
class TheMap extends Component {
  constructor(props){   
    super(props);
    this.onMarkerclick=this.onMarkerclick.bind(this);
    this.state={
      center:{ lat: Data[0].lat, lng:Data[0].lng},
      data:[],
      site:"",
      listTickets:this.props.userLogs
    }   
  } 
  componentDidMount(){
    
    this.setState({
        data:Data
    })
  }
 
  onMarkerclick(siteName){
  
   this.setState({
     site:siteName
   })
}
  render() {
    return (
      <MyMapComponent
        center={this.state.center}
        data={this.state.listTickets}
        click={this.onMarkerclick}      
      />
    )
  }
}

export default TheMap


function MyMapComponent(props) {
  // Need to improve marker array to avoid duplicates 11/26/2020
  return (
    
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={10}
      >
        {props.data.map((loc,index)=>{
    
          return<Marker
            key={index}
            title={loc.site}
            animation={loc.bounce?window.google.maps.Animation.BOUNCE:window.google.maps.Animation.NULL}
            position={{lat:loc.lat,lng:loc.lng}}
            onClick= {()=>props.click(loc.site)}          
          />
        })}
      </GoogleMap>
    
  )
  }

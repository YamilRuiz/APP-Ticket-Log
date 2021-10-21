import React,{Component} from "react";
import {GoogleMap, Marker} from "@react-google-maps/api";


const containerStyle = {
  width: '100%',
  height: '400px'
};
class TheMap extends Component {
  constructor(props){   
    super(props);
    this.onMarkerclick=this.onMarkerclick.bind(this);
    this.state={
      
      center:{ lat:this.props.userSites[0].userLogs[0].lat, lng:this.props.userSites[0].userLogs[0].lng},
      site:"",
      listTickets:this.props.userSites[0].userLogs
    }   
  } 
 // Will bring up modal with all logs of the site
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

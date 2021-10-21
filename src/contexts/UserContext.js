import React, { Component } from "react";

const Data=[
    { site:'DXL01234',ticket:'TT0000456123',description:'The text message length calculator is a simple tool that can tell you many things about a text message, such as the number of characters, type of characters use',lat:32.884254, lng:-97.276890,visible:true,bounce:true},
    { site:'DXL01234',ticket:'TT0000456153',description:' in aliquet pellentesque, mi urna molestie lorem, ut sagittis libero erat nec elit. In hac habitasse platea dictumst. Suspendisse volutpat convallis leo eu pretium.',lat:32.884254, lng:-97.276890,visible:true,bounce:true},
    { site:'DXL01234',ticket:'TT0000456163',description:'disse volutpat convallis leo eu pretium.',lat:32.884254, lng:-97.276890,visible:true,bounce:true},
    { site:'DXL01238',ticket:'TT0000456183',description:'in aliquet pellentesque, mi urna molestie lorem, ut sagittis libero erat nec elit. In hac habitasse platea dictumst. Suspendisse volutpat convallis leo eu pretium.',lat:32.883707, lng:-97.275264,visible:true,bounce:true},
    { site:'DXL01235',ticket:'TT0000456193',description:'in aliquet pellentesque, mi urna molestie lorem, ut sagittis libero erat nec elit. In hac habitasse platea dictumst. Suspendisse volutpat convallis leo eu pretium.',lat:32.885096, lng: -97.269809,visible:true,bounce:true}
];

const UserSiteData={
	username:'Yamil',
	password:'xxxxxxx',
	userLogs:[
		{ site:'DXL01234',lat:32.884254, lng:-97.276890,visible:true,bounce:false},
    	{ site:'DXL01238',lat:32.883707, lng:-97.275264,visible:true,bounce:false},
    	{ site:'DXL01235',lat:32.885096, lng: -97.269809,visible:true,bounce:false}
		]
	};
export const UsersContext = React.createContext();

export class UserContextProvider extends Component{
    state={
        user:'yr3564',
        loggedIn:false,
        userLogs:Data,
        userSites:[UserSiteData]        
    }
    setUser = (u)=>{this.setState({user:u})};
    setUserLogs= (u)=>{this.setState({userLogs:u})};
    setUserSites= (u)=>{this.setState({userSites:u})};
    setClickLog=(u)=>{this.setState({clickLog:u})};
    setloggedIn=(u)=>{this.setState({loggedIn:u})}
    render(){
        return(
            <UsersContext.Provider value={{user:this.state.user, loggedIn:this.state.loggedIn,
            setUser: this.setUser, setUserLogs:this.setUserLogs, 
            setUserSites:this.setUserSites, setloggedIn:this.setloggedIn,
            userLogs: this.state.userLogs,userSites:this.state.userSites}}>
                {this.props.children}
            </UsersContext.Provider>
        )
    }
}
import React, {Component} from 'react';



export default class AcceptRegistration extends Component{
render(){
    const { data } = this.props.location.state;
    return(
        <h1>{data.surName}</h1>
    )
}
}
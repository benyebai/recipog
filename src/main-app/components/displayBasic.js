import React from "react";

class DisplayBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <img src={this.state.thumbnail_url} alt="food" />


            </div>
        )
    }
  }
  
export default DisplayBasic;
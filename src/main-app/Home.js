import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";




export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
        
        this.callInfo = this.callInfo.bind(this);
    }

    callInfo() {
        
        const options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: {from: '0', size: '20', tags: 'under_30_minutes'},
            headers: {
              'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
              'X-RapidAPI-Key': '8b3b76d149msh8e93702247b0dcfp19dd88jsn9f526fa40eda'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
          }).catch(function (error) {
              console.error(error);
          });
    }

    render() {
        
        return(
            <div className="main">
                <h1>AMONG US BALLS</h1>
                <Button onClick={this.callInfo()}></Button>
            </div>
        );
    }
}
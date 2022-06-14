import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import DisplayBasic from "./components/displayBasic"



export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            data: null
        }
        
    }

    async componentDidMount() {
        const options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/feeds/list',
            params: {size: '5', timezone: '+0700', vegetarian: 'false', from: '0'},
            headers: {
                'X-RapidAPI-Key': '8b3b76d149msh8e93702247b0dcfp19dd88jsn9f526fa40eda',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        
        await axios.request(options)
        
        .then((response) => {

            for (let i = 0; i < response.data.results.length; i++) {
                if (response.data.results[i].name === "Trending") {
                    this.setState({data: response.data.results[i].items})
                    
                    console.log(response.data.results[i].items)
                    axios.post("http://localhost:3001/api/trendingmorning", {data: response.data.results[i].items})

                    .then((res) => {
                        console.log(res)
                    })

                    .catch((err) => {
                        console.log("error");
                    });
                }
            }
            
            
        })
        .catch(function (error) {

            console.error(error);
        });
    }

    render() {
        
        if (this.state.data) {  
            return(
                <div className="main">
                    <DisplayBasic data={this.state.data[3]} />
                </div>
            );
        }
    }
}
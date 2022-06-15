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
        
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();

        
        await axios.get("http://localhost:3001/api/gettrending/" + year + "-" + month + "-" + date)
        .then((res) => {
            console.log(res.data.data)
            if (res.data.data == null) {
                
                const options = {
                    method: 'GET',
                    url: 'https://tasty.p.rapidapi.com/feeds/list',
                    params: {size: '5', timezone: '+0100', vegetarian: 'false', from: '0'},
                    headers: {
                        'X-RapidAPI-Key': '8b3b76d149msh8e93702247b0dcfp19dd88jsn9f526fa40eda',
                        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
                    }
                };
                
                axios.request(options)
                
                .then((response) => {

                    for (let i = 0; i < response.data.results.length; i++) {
                        if (response.data.results[i].name === "Trending") {
                            
                            let dataa = []
                            for (let j = 0; j < 6; j++) {
                                dataa.push(response.data.results[i].items[j])
                            }

                            this.setState({data: dataa})

                            axios.post("http://localhost:3001/api/storetrending", {data: dataa})

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

                
            } else {
                this.setState({data: res.data.data})
            }
        })

        
    }

    render() {
        
        if (this.state.data) {  

            let displayedTrending = []
            for (let i = 0; i < this.state.data.length; i++) {
                displayedTrending.push(<DisplayBasic data={this.state.data[i]} key={i} />)
            }

            return(
                <div className="main">
                    {displayedTrending}
                </div>
            );
        }
    }
}
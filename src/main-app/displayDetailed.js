import axios from "axios";
import React from "react";

export class DisplayDetailed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            data: null
        }; 
        console.log(this.state.id)
    }

    componentDidMount() {
        let temp_id = this.state.id

        var self = this;
        
        // get recipe, if not in database, request from API then store in database
        axios.get("http://localhost:3001/api/getrecipe/" + temp_id)
        .then((res) => {

            
            if (res.data == "") {
                        
                const options = {
                    method: 'GET',
                    url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
                    params: {id: this.state.id},
                    headers: {
                    'X-RapidAPI-Key': '8b3b76d149msh8e93702247b0dcfp19dd88jsn9f526fa40eda',
                    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
                    }
                };
                
                axios.request(options)
                .then(function (response) {
                    
                    console.log(response.data)
                    self.setState({data: response.data});

                    axios.post("http://localhost:3001/api/storerecipe", {id: temp_id, data: response.data})

                    .then((res) => {
                        console.log(res)
                    })

                    .catch((err) => {
                        console.log("error");
                    });

                    

                }).catch(function (error) {
                    console.error(error);
                });
                
                
                
                
            } else {
                this.setState({data: res.data.data})
            }
           

        })

        // get similar reciepes from API
        const options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list-similarities',
            params: {recipe_id: '8138'},
            headers: {
              'X-RapidAPI-Key': '8b3b76d149msh8e93702247b0dcfp19dd88jsn9f526fa40eda',
              'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
          }).catch(function (error) {
              console.error(error);
          }); 

    }
    
    render() {
        if (this.state.data != null) {
            console.log(this.state.data)

            let instructions = []
            for (let i = 0; i < this.state.data.instructions.length; i++) {
                const steps = <p>
                    {this.state.data.instructions[i].display_text}
                </p>
                
                instructions.push(steps)
            }

            return (
                <div>
                    <h1>{this.state.data.name}</h1>
                    <img className=" food-img" src={this.state.data.thumbnail_url} alt="food" />
                    {instructions}
                </div>
            )
        }
    }
}
  
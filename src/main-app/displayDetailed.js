import axios from "axios";
import React from "react";
import { RecipeCarousel } from "./components/carousel";
import './displayDetailed.css'

export class DisplayDetailed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            data: null,
            similarIDsInfo: []
        }; 

        console.log(this.state.id)
    }

    async componentDidMount() {
        // local
        let temp_id = this.state.id

        //global
        var self = this;

        let similar_ids = []

        
        // get similar reciepes from API

        await axios.get("http://localhost:3001/api/getsimilar/" + temp_id)

        .then((res) => {

            if (res.data === "") {
                
                const options = {
                method: 'GET',
                url: 'https://tasty.p.rapidapi.com/recipes/list-similarities',
                params: {recipe_id: this.state.id},
                headers: {
                    'X-RapidAPI-Key': '8b3b76d149msh8e93702247b0dcfp19dd88jsn9f526fa40eda',
                    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
                }
                };
            
                axios.request(options)
                
                .then(function (response) {
                    
                    // sometimes results might have less than 6, so we have to take that into account
                    if (response.data.results.length < 6) {
                        for (let i = 0; i < response.data.results.length; i++) {
                            similar_ids.push(response.data.results[i].id)
                        }

                        axios.post("http://localhost:3001/api/storesimilar", {id: temp_id, data: similar_ids})

                    } else {
                        for (let i = 0; i < 6; i++) {
                            similar_ids.push(response.data.results[i].id)
                        }

                        axios.post("http://localhost:3001/api/storesimilar", {id: temp_id, data: similar_ids})

                    }
                    
                })

                
            } else {
                similar_ids= res.data.similar
            }
        })

        
        // get recipe, if not in database, request from API then store in database
        await axios.get("http://localhost:3001/api/getrecipe/" + temp_id)
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
                    
                    //console.log(response.data)
                    self.setState({data: response.data});

                    axios.post("http://localhost:3001/api/storerecipe", {id: temp_id, data: response.data})

                })
         
            } else {

                this.setState({data: res.data.data})

            }
        })
        

        // where the error happens since self.state.similarIDs dosent yet exist
        let info_array = []
        for (let i = 0; i < similar_ids.length; i++) {

            await axios.get("http://localhost:3001/api/getrecipe/" + similar_ids[i])
            .then((res) => {

                
                if (res.data == "") {
                    
                    const options = {
                        method: 'GET',
                        url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
                        params: {id: similar_ids[i]},
                        headers: {
                        'X-RapidAPI-Key': '8b3b76d149msh8e93702247b0dcfp19dd88jsn9f526fa40eda',
                        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
                        }
                    };
                    
                    axios.request(options)
                    .then(function (response) {
                        
                        //console.log(response.data)
                        info_array.push(response.data);

                        axios.post("http://localhost:3001/api/storerecipe", {id: similar_ids[i], data: response.data})

                    })
                
                    
            
                } else {

                    info_array.push(res.data.data)

                }
            })
        }

        self.setState({similarIDsInfo: info_array})

    }
    
    render() {

        if (this.state.data != null && this.state.similarIDsInfo.length != 0) {
            
            console.log(this.state.similarIDsInfo)

            //instruction
            let instructions = []
            for (let i = 0; i < this.state.data.instructions.length; i++) {
                const steps = <p>
                    {this.state.data.instructions[i].display_text}
                </p>
                
                instructions.push(steps)
            }
            
            //ingredients
            let ingredients = []
            if (this.state.data.sections[0].components.length !== 0) {
                for (let i = 0; i < this.state.data.sections[0].components.length; i++) {
                    if (this.state.data.sections[0].components[i].raw_text != "n/a") {
                        const ingredient = <div>
                            <h2 className="nutrition-text" >
                                {this.state.data.sections[0].components[i].raw_text}
                            </h2>
                        </div>

                        ingredients.push(ingredient)
                    }
                }
            }

            //nutrition
            let nutrition = []
            if (this.state.data.nutrition) {
                for (let x in this.state.data.nutrition) {
                    if (x !== "updated_at") {
                        const facts = <div>
                            <h2 className="nutrition-text">
                            {x} : {this.state.data.nutrition[x]}
                            </h2>
                        </div>
                        nutrition.push(facts)
                    }
                }
            }
            


            return (
                <div className="detailed-container">
                    <h1>{this.state.data.name}</h1>

                    <img className="food-img" src={this.state.data.thumbnail_url} alt="food" />

                    <div className="ingre-instruct">
                        <div className="instruction">
                            <h2>instructions!</h2>
                            {instructions}

                            <h2>ingredients!</h2>
                            {ingredients}
                        </div>

                        <div className="instruction">
                            <h2>nutrition facts!</h2>
                            {nutrition}

                            <h2>{this.state.data.yields}</h2>
                        </div>

                    </div>

                    
                    
                    <h2>similar to this recipe!</h2>
                    <RecipeCarousel data={this.state.similarIDsInfo} />
                </div>
            )
        }
    }
}
  
import React from "react";
const axios = require("axios");


export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",

        }
        
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    // handles the input box and updates the state whenever its changed
    handleChange(e) {
        
        this.setState({search: e.target.value})
    }

    //submit button, asynchronous so i can use await
    async submit(e) {
        //prevents it from refreshing the page whenever a "event" happens
        e.preventDefault();


        const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: {from: '0', size: '10', q: this.state.search},
        headers: {
            'X-RapidAPI-Key': '539bdafaefmsh23c5e3073cb4ca5p1d5a73jsnf211d6f72f99',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    
        
    }

    //renders a simple html of text box
    render() {
        
        return(
            <div>
                 <form className="input-container">

                    <input
                        placeholder="search bar"
                        type="text"
                        size="100px"
                        onChange={this.handleChange}
                    />

                    <button onClick={this.submit}>
                        yes
                    </button>

                </form>
            </div>
        );
    }
}
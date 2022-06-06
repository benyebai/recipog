import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    // handles the input box and updates the state whenever its changed
    handleChange(e) {
        
        this.setState({[e.target.id]: e.target.value})
    }

    //submit button, asynchronous 
    async submit(e) {
        //dosent refresh page
        e.preventDefault();

        //we wait for this function to finish running
        //a post request, which has .then for whats next, .catch in case of error
        await axios.post("http://localhost:3001/authentication", this.state)

        .then((res) => {
            
            if (res.data.rows.length >= 1) {
                window.location.href = '/home'

            } else {
                alert("badf");
            }
        })

        .catch((err) => {
            console.log("error");
        });
        
    }

    //renders a simplehtml of text boxes
    render() {
        
        return(
            <div>
                <form className="input-container">

                    <input
                        placeholder="email"
                        type="text"
                        size="100px"
                        onChange={this.handleChange}
                        id='email'
                        className=""
                    />

                    <input
                        placeholder="password"
                        type="password"
                        size="100px"
                        onChange={this.handleChange}
                        id='password'
                    />

                    <button onClick={this.submit}>
                        yes
                    </button>


                </form>
            </div>
        );
    }
}

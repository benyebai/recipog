import React from "react";
import axios from "axios";

import './Register.css'

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username:""
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        
        this.setState({[e.target.id]: e.target.value})
    }

    async submit(e) {
        e.preventDefault();

        if (this.state.email.length !== 0 && this.state.password.length !== 0  && this.state.username.length !== 0) {
            
            // goes and retrieves account with same username or email, and if it actually retrieves something that means ur email or username is taken
            await axios.post("http://localhost:3001/checkemail", this.state)

            .then((res) => {
                console.log(res)

                if (res.data.rows.length >= 1) {
                    if (res.data.rows[0].username === this.state.username) {
                        alert("username taken")
                    } 
                    
                    else if (res.data.rows[0].email === this.state.email)  {
                        alert("email taken")
                    }

                } else {

                    // adds your account to the database
                    axios.post("http://localhost:3001/adduser", this.state)
                    .then((res) => {
                        console.log(res)
                    })

                    .catch((err) => {
                        console.log("error");
                    });
                    
                    alert("success")
                }
            })

            .catch((err) => {
                console.log("error");
            });
        }
    }

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

                    <input
                        placeholder="username"
                        type="text"
                        size="100px"
                        onChange={this.handleChange}
                        id='username'
                    />

                    <button onClick={this.submit}>
                        yes
                    </button>


                </form>
            </div>
        );
    }
}

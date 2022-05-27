import React from "react";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e)
        this.setState({[e.target.id]: e.target.value})
    }

    render() {
        console.log(this.state)
        return(
            <div>
                <form>

                    <input
                        placeholder="email"
                        type="text"
                        size="100px"
                        onChange={this.handleChange}
                        id='email'
                    />
                    
                    <br />

                    <input
                        placeholder="password"
                        type="text"
                        size="100px"
                        onChange={this.handleChange}
                        id='password'
                    />


                </form>
            </div>
        );
    }
}

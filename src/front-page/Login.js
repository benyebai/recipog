import React from "react";

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

    handleChange(e) {
        
        this.setState({[e.target.id]: e.target.value})
    }

    async submit(e) {
       
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

                    <button onClick={this.submit}>
                        yes
                    </button>


                </form>
            </div>
        );
    }
}

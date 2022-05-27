import './App.css';
import React from "react";
import { Login } from './Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div>

        <h1>Create Account</h1>
        <Login />
        
      </div>
    );
  }
}

export default App;
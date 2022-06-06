import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './front-page/Landing';
import { Register } from './front-page/Register';
import {Login} from './front-page/Login';
import { Home } from './main-app/Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
  };
}

  render() {
    return (  
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
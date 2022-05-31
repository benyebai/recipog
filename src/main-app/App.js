import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from '../front-page/Landing';
import { Register } from '../front-page/Register';

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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
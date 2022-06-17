import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Landing from './front-page/Landing';
import { Register } from './front-page/Register';
import {Login} from './front-page/Login';
import { Home } from './main-app/Home';
import { DisplayDetailed } from './main-app/displayDetailed';
import { Search } from './main-app/Search';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={id:""}
  }
    // based on the URL, takes you to different pages
    render() {

      let Wrapper = () => {
        const params = useParams();
        return (<
          DisplayDetailed id={params.id} />);
      }

      return (  
        <div>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Landing />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="home" element={<Home />} />
              <Route path="recipe/:id" element={<Wrapper />} />
              <Route path="search" element={<Search />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      );
    }
  }


export default App;
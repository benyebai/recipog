import React from "react";
import wholesome from './images/wholesome.png'
import women from './images/women.jpg'
import './Landing.css'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

// used a class component that returns html for the landing page
class Landing extends React.Component {
    constructor(props) {
      super(props);
  }
  
    render() {
      return (
        <div className="master"> 

          <p className="title">RECIPOG</p>        
          <div className="main-container">
            
            <div className="divider">
              <img src={women} alt="Logo" className="wholesome" />
            </div>

            <div className="divider">
              <p className="blurb">TO CONNECT. TO INNOVATE. <br /> THE FUTURE OF NURISHMENT
              </p>
              <div>
                <Link to="/register" className="button">
                  <Button className="button btn btn-danger">
                    register 
                  </Button>
                
                </Link>

                <Link to="/login" className="button">
                  <Button className="button btn btn-danger">
                    login 
                  </Button>
                
                </Link>
              </div>
            </div>
          </div> 
        </div>
      );
    }
  }
  
export default Landing;
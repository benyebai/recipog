import React from "react";
import wholesome from './images/wholesome.png'
import './Landing.css'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class Landing extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
    };
  }
  
    render() {
      return (
        <div className="master">         
          <div className="main-container">
            <img src={wholesome} alt="Logo" className="wholesome" />

            <p className="title">RECIPOG</p>
            <p className="blurb">A sharing platform for your recipes,
             with a community that can<br /> upvote your recipes and
              find the most popular recipes all in one app.
            </p>
            
            <Link to="/register" className="button">
              <Button>
                register 
              </Button>
            </Link>

          </div> 
        </div>
      );
    }
  }
  
export default Landing;
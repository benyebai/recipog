import React from "react";
import './displayBasic.css'

class DisplayBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        console.log(this.state)

        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler() {
        window.location.href = "/recipe/" + this.state.id
    }
    
    render() {

        // used for creating an array essentially of HTML objects to display
        let nutrition = []
        if (this.state.nutrition) {
            for (let x in this.state.nutrition) {
                if (x !== "updated_at") {
                    const facts = <div>
                        <h2 className="nutrition-text">
                        {x} : {this.state.nutrition[x]}
                        </h2>
                    </div>
                    nutrition.push(facts)
                }
            }
        }

        // same thing but for ingredients
        let ingredients = []
        if (this.state.sections[0].components.length !== 0) {
            for (let i = 0; i < this.state.sections[0].components.length; i++) {
                if (this.state.sections[0].components[i].raw_text != "n/a") {
                    const ingredient = <div>
                        <h2 className="nutrition-text">
                            {this.state.sections[0].components[i].raw_text}
                        </h2>
                    </div>

                    ingredients.push(ingredient)
                }
            }
        }


        return (
            <div className="display-basic-container">
                <h1 className="display-basic-text" >{this.state.name}</h1>

                <div className="display-basic-img">
                    <a onClick={this.clickHandler}>
                        <img className=" food-img" src={this.state.thumbnail_url} alt="food" />
                    </a>
                </div>

                <div className="nutrition">
                    <h1>NUTRITION</h1>
                    {nutrition}
                </div>

                <div>
                <h1>INGREDIENTS</h1>
                    {ingredients}
                </div>


            </div>
        )
    }
  }
  
export default DisplayBasic;
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './carousel.css'

export class RecipeCarousel extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {

            data: props.data

        }

        
    }

    render() {

        let carouselArray = []
        for (let i = 0; i < this.state.data.length; i++) {
            let carouselItem = 
            <a href={this.state.data[i].id} >
            <div >
                <p><b>{this.state.data[i].name}</b></p>

                
                <img src={this.state.data[i].thumbnail_url} alt="food" />
                
            </div>
            </a>

            carouselArray.push(carouselItem)
        }
        
        return (
            <Carousel infiniteLoop={true} width={600} autoPlay={true} interval={2000}>
                {carouselArray}
            </Carousel>
        );
    }
};
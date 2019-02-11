import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.scss';
import carouselItems from "./constants/carousel_items";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      item: "",
      active: true
    }
  }

  componentDidMount(){
    this.setState({
      items: carouselItems,
    }, () => {
      this.checkCarousel();
    });
    
  }

  checkCarousel(){
    if(this.state.items){
      const carousel = document.querySelectorAll(".carousel-item");
      console.log(carousel);
    }
  }

  render() {
    const {items} = this.state;
    let newItems;
    if(items){
      newItems = items.map( (item) => {
        return(
          <div key={item.id} className="carousel-item">
            <div className="img-container">
              <img src={item.image_url} alt=""/>
            </div>
            <div className="img-description">
              <p>{item.img_description}</p>
            </div>
          </div>
        )
      });
    }

    return (
      <div className="App">
        <div className="sidebar"></div>
        <header className="">
          <div className="carousel-container">
            {newItems}
            <div className="carousel-buttons">
              <button className="left">Prev</button>
              <button className="right">Next</button>
            </div>
          </div>
        </header>
        <div className="sidebar"></div>
      </div>
    );
  }
}

export default App;

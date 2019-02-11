import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.scss';
import carouselItems from "./constants/carousel_items";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      item: "",
      index: 0,
      prevIndex: carouselItems.length
    }
  }

  componentDidMount(){
    this.setState({
      items: carouselItems,
    }, () => {
      this.checkCarousel();
    });
    
  }

  handleClickNext(e){
    e.preventDefault();
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");
    carousel[index].nextSibling.classList.add("active");

    this.setState({
      index: index + 1,
      prevIndex: index,
    }, () => {
      this.hidePrev();
    })
  }

  hidePrev(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");
    carousel[prevIndex].classList.remove("active");

    if(index == carouselItems.length){
      this.setState({
        index: 0
      });

      carousel[0].classList.add("active");
    }
  }

  // click on previous click
  handleClickPrev(e){
    e.preventDefault();
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");
    
    console.log(index);
    if(index == 0){
      this.setState({
        index: 2,
        prevIndex: 0
      }, () => {
        this.hideNext();
      });
    }
    
    if(index !=0){
      this.setState({
        index: index - 1,
        prevIndex: index
      }, () => {
        this.hideNext();
      });
    }
  }

  // hide the other elements
  hideNext(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");

    carousel[index].classList.add("active");
    carousel[prevIndex].classList.remove("active");
  }

  checkCarousel(){
    const {index, items} = this.state;
    if(items){ 
      const carousel = document.querySelectorAll(".carousel-item");
      carousel[index].classList.add("active");
    }
  }

  render() {
    const {items, index, prevIndex} = this.state;
    let newItems;

    if(items){
      console.log("This is the previous index:")
      console.log(prevIndex);

      console.log("This is the current index:")
      console.log(index);
    }

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
              <button className="left" onClick={this.handleClickPrev.bind(this)}>Prev</button>
              <button className="right" onClick={this.handleClickNext.bind(this)}>Next</button>
            </div>
          </div>
        </header>
        <div className="sidebar"></div>
      </div>
    );
  }
}

export default App;

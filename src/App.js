import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.scss';
import carouselItems from "./constants/carousel_items";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronLeft, faChevronRight);


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      item: "",
      index: 0,
      prevIndex: carouselItems.length,
      pressed: false
    }
  }

  componentDidMount(){
    this.setState({
      items: carouselItems,
    }, () => {
      this.checkCarousel();
    });

    this.moveCarousel();
  }

  // clicking the next button
  handleClickNext(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");
    carousel[index].nextSibling.classList.add("active");

    this.setState({
      index: index + 1,
      prevIndex: index,
      pressed: true
    }, () => {
      this.hidePrev();
    })
  }

  // hiding the previous indexes after clicing next
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
  handleClickPrev(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");
    
    console.log(index);
    if(index == 0){
      this.setState({
        index: 2,
        prevIndex: 0,
        pressed: true
      }, () => {
        this.hideNext();
      });
    }
    
    if(index !=0){
      this.setState({
        index: index - 1,
        prevIndex: index,
        pressed: true
      }, () => {
        this.hideNext();
      });
    }
  }

  // hide the previous indexes after clicking prev
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

  moveCarousel(){
    const {pressed} = this.state;
    let interval;
    let time = 0;

    interval = setInterval(() => {
      if(!pressed){
        time++;

        if(time % 5 === 0){
          this.handleClickNext();
        }

        console.log(time);
      }
      else{
        clearInterval(interval);
        time=0;
      }
    }, 1000);
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
          <div key={item.id} className="carousel-item fade">
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
              <div className="left button" onClick={this.handleClickPrev.bind(this)}><FontAwesomeIcon icon="chevron-left" /></div>
              <div className="right button" onClick={this.handleClickNext.bind(this)}><FontAwesomeIcon icon="chevron-right" /></div>
            </div>
          </div>
        </header>
        <div className="sidebar"></div>
      </div>
    );
  }
}

export default App;

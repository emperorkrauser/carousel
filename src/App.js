import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.scss';
import carouselItems from "./constants/carousel_items";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronLeft, faChevronRight);

let interval;

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      item: "",
      index: 0,
      prevIndex: carouselItems.length,
      pressed: false,
      loading: true
    }
  }

  componentDidMount(){

    setTimeout( () => {
      this.setState({
        loading: false,
        items: carouselItems,
      }, () => {
        this.checkCarousel(); 
        this.moveCarousel();
      });
    }, 500);
  }

  // clicking the next button
  handleClickNext(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");
    carousel[index].nextSibling.classList.add("active");
    carousel[index].nextSibling.classList.add("fade");

    this.setState({
      index: index + 1,
      prevIndex: index,
      pressed: true
    }, () => {
      this.hidePrev();
    });

    this.handleClearInterval();
  }

  // hiding the previous indexes after clicing next
  hidePrev(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");
    carousel[prevIndex].classList.remove("active");
    carousel[prevIndex].classList.remove("fade");

    if(index == carouselItems.length){
      this.setState({
        index: 0
      });

      carousel[0].classList.add("active");
      carousel[0].classList.add("fade");
    }
  }

  // click on previous click
  handleClickPrev(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");
    
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

    this.handleClearInterval();
  }

  // hide the previous indexes after clicking prev
  hideNext(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");

    carousel[index].classList.add("active");
    carousel[index].classList.add("fade");
    carousel[prevIndex].classList.remove("active");
    carousel[prevIndex].classList.remove("fade");
  }

  // initial checking of the carousel
  checkCarousel(){
    const {index, items, loading} = this.state;

    if(!loading){
      const carousel = document.querySelectorAll(".carousel-item");
      carousel[index].classList.add("active");
      carousel[index].classList.add("fade");
    }
  }

  // initial move of the carousel
  moveCarousel(){
    const {pressed} = this.state;
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");
    let time = 0;

    interval = setInterval(() => {
      if(!pressed){
        time++;
        console.log(time);
        if(time % 5 === 0){
          this.handleGoToNext();
        }
      }
      else{
        clearInterval(interval);
        time=0;
      }
    }, 1000);
  }

  // clear interval
  handleClearInterval(){
    clearTimeout(interval);
  }

  // go to next slide but prevent clicking
  handleGoToNext(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");

    carousel[index].nextSibling.classList.add("active");
    carousel[index].nextSibling.classList.add("fade");

    this.setState({
      index: index + 1,
      prevIndex: index,
    }, () => {
      this.hidePrev();
    });
  }

  // go to specific index after clicking
  handleGoToIndex(e){
    e.preventDefault();
    const {index, prevIndex} = this.state;
    clearTimeout(interval);

    this.setState({
      index: Number(e.target.id),
      prevIndex: index,
    });

    this.handleShowIndex();

  }

  handleShowIndex(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");

    console.log(index);

    if(!index === prevIndex){
      carousel[index].classList.add("active");
    }

  }

  render() {
    const {items, index, prevIndex, loading} = this.state;
    let newItems;
    let thumbnails;

    // if(items){
    //   console.log("This is the previous index:")
    //   console.log(prevIndex);

    //   console.log("This is the current index:")
    //   console.log(index);
    // }

    if(!loading){
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
    else{
      return(
        <div className="loading-panel">
          <div className="loader"></div>
        </div>
      )
    }

    if(!loading){
      thumbnails = items.map( (item) => {
        return(
          <div key={item.id} className="thumb-item">
            <div className="thumb-img">
              <img id={item.id} src={item.image_url} alt="" onClick={this.handleGoToIndex.bind(this)}/>
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
          <div className="thumbnails">
            {thumbnails}
          </div>
        </header>
        <div className="sidebar"></div>
      </div>
    );
    
  }
}

export default App;

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

    if(index != index.length){
      this.setState({
        index: index + 1,
        prevIndex: index,
        pressed: true
      }, () => {
        this.hidePrev();
        this.handleMarkThumbnail();
      });
    }

    this.handleClearInterval();
  }

  // hiding the previous indexes after clicing next
  hidePrev(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");
    
    for(let x=0; x < carousel.length; x++){
      if(x != index){
        carousel[x].classList.add("hide");
        carousel[x].classList.remove("fade");
        carousel[x].classList.remove("active");
      }
      else{
        carousel[x].classList.remove("hide");
        carousel[x].classList.add("fade");
        carousel[x].classList.add("active");
      }
    }

    if(index == carouselItems.length){
      this.setState({
        index: 0
      });

      for(let x=0; x < carousel.length; x++){
        if(x == 0){
          carousel[0].classList.add("active");
          carousel[0].classList.add("fade");
          carousel[0].classList.remove("hide");
        }
      }
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
        this.handleMarkThumbnail();
      });
    }
    
    if(index !=0){
      this.setState({
        index: index - 1,
        prevIndex: index,
        pressed: true
      }, () => {
        this.hideNext();
        this.handleMarkThumbnail();
      });
    }

    this.handleClearInterval();
  }

  // hide the previous indexes after clicking prev
  hideNext(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");

    for(let x=0; x < carousel.length; x++){
      if(x == index){
        carousel[x].classList.add("active");
        carousel[x].classList.add("fade");
        carousel[x].classList.remove("hide");
      }
      else{
        carousel[x].classList.add("hide");
        carousel[x].classList.remove("fade");
        carousel[x].classList.remove("active");
      }
    }

  }

  // initial checking of the carousel
  checkCarousel(){
    const {index, items, loading} = this.state;

    if(!loading){
      const carousel = document.querySelectorAll(".carousel-item");
      const thumbItems = document.querySelectorAll(".thumb-item");

      carousel[index].classList.add("active");
      carousel[index].classList.add("fade");
      carousel[0].classList.remove("hide");
      thumbItems[index].classList.add("active-img");

      for(let x=index; x < carousel.length; x++){
        if(x != 0){
          carousel[x].classList.add("hide");
        }
      }
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

    this.setState({
      index: index + 1,
      prevIndex: index,
    }, () => {
      this.hidePrev();
      this.handleMarkThumbnail();
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
    }, () => {
      this.handleShowIndex();
      this.handleMarkThumbnail();
    });

  }

  // callback function to show the clicked index
  handleShowIndex(){
    const {index, prevIndex} = this.state;
    const carousel = document.querySelectorAll(".carousel-item");

    for(let x=0; x < carousel.length; x++){
      if(index != prevIndex){
        carousel[x].classList.add("hide");
        carousel[x].classList.remove("fade");
        carousel[x].classList.remove("active");
      }

      if(index == x){
        carousel[x].classList.remove("hide");
        carousel[x].classList.add("fade");
        carousel[x].classList.add("active");
      }
    }
  }

  handleMarkThumbnail(){
    const {index, prevIndex} = this.state;
    const thumbItems = document.querySelectorAll(".thumb-item");

    console.log("mark thumb");
    console.log(index);

    for(let x=0; x < thumbItems.length; x++){
      if(x == index){
        thumbItems[x].classList.add("active-img");
        thumbItems[prevIndex].classList.remove("active-img");
      }
    }

    if(index == thumbItems.length){
      thumbItems[0].classList.add("active-img");
      thumbItems[prevIndex].classList.remove("active-img");
    }
  }

  render() {
    const {items, index, prevIndex, loading} = this.state;
    let newItems;
    let thumbnails;

    // if(items){
    //   console.log("--------");
    //   console.log("This is the previous index:")
    //   console.log(prevIndex);

    //   console.log("This is the current index:")
    //   console.log(index);
    //   console.log("--------");
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
          <div key={item.id} className="thumb-item" onClick={this.handleGoToIndex.bind(this)}>
            <div className="thumb-img">
              <img id={item.id} src={item.image_url} alt=""/>
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

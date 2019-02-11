import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="sidebar"></div>
        <header className="">
          <div className="carousel-container">
            <div className="carousel-item">
              <div className="img-container">
                <img src="https://via.placeholder.com/640x360" alt=""/>
              </div>
              <div className="img-description">
                <p>This is a description</p>
              </div>
            </div>
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

import React, { Component } from 'react';
import './Loader.css';

class Loading extends Component {
  render() {
    return (
      <div className="preloader">
        <div className="preloader-content">
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
          <span className="line line-4"></span>
          <span className="line line-5"></span>
          <span className="line line-6"></span>
          <span className="line line-7"></span>
          <span className="line line-8"></span>
          <span className="line line-9"></span>
          <div>Loading</div>
        </div>
      </div>
    )
  }
}

export default Loading;
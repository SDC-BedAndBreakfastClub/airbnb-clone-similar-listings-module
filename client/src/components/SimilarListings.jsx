
import axios from 'axios';
import React from 'react';
import Listing from './Listing';
import '../styles/app.css';

class SimilarListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      displacement: 0,
    };
  }

  componentDidMount() {
    // provide 12 random listings
    // axios.get('/api/rooms/1/similar_listings')
    axios.get(`http://localhost:3003/api${window.location.pathname}/similar_listings`)
      .then((response) => {
        this.setState({
          listings: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  slideLeft() {
    const { displacement } = this.state;
    this.setState({
      displacement: displacement - 8.33,
    });
  }

  slideRight() {
    const { displacement } = this.state;
    this.setState({
      displacement: displacement + 8.33,
    });
  }

  render() {
    const { listings, displacement } = this.state;
    const cssStyle = {
      transform: `translateX(${displacement}%`,
      transition: '-webkit-transform 0.5s ease-in-out',
    };
    const buttonStyle = {
      height: '24px',
      width: '24px',
      display: 'block',
      fill: 'rgb(118, 118, 118)',
      cursor: 'pointer',
    };
    const renderButton = (direction) => {
      let output;
      if (direction < 0) {
        if (displacement < -2) {
          output = (
            <button className="prev-arrow" type="button" onClick={() => this.slideRight()}>
              <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false" style={buttonStyle}>
                <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd" />
              </svg>
            </button>
          );
        }
      } else if (displacement > -74) {
        output = (
          <button className="next-arrow" type="button" onClick={() => this.slideLeft()}>
            <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false" style={buttonStyle}>
              <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd" />
            </svg>
          </button>
        );
      }
      return output;
    };
    if (listings.length) {
      return (
        <div className="center-page">
          <h2 className="main-title">Similar Listings</h2>
          <div className="outermost">
            <div>{renderButton(-1)}</div>
            <div className="wrap">
              <div className="carousel" style={cssStyle}>
                <Listing listing={listings[0]} />
                <Listing listing={listings[1]} />
                <Listing listing={listings[2]} />
                <Listing listing={listings[3]} />
                <Listing listing={listings[4]} />
                <Listing listing={listings[5]} />
                <Listing listing={listings[6]} />
                <Listing listing={listings[7]} />
                <Listing listing={listings[8]} />
                <Listing listing={listings[9]} />
                <Listing listing={listings[10]} />
                <Listing listing={listings[11]} />
              </div>
            </div>
            <div>{renderButton(1)}</div>
          </div>
        </div>
      );
    }
    return (
      <div className="center-page">
        <p>Loading...</p>
      </div>
    );
  }
}

export default SimilarListings;

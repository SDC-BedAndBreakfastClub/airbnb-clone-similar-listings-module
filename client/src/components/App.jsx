
import axios from 'axios';
import React from 'react';
import Listing from './Listing';
import '../styles/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      displacement: 0,
    };
    this.slideLeft.bind(this);
  }

  componentDidMount() {
    // provide 12 random listings
    axios.get('/api/rooms/1/similar_listings')
      .then((response) => {
        this.setState({
          listings: response,
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
    const { listings } = this.state;
    const { displacement } = this.state;
    const cssStyle = {
      transform: `translateX(${displacement}%`,
      transition: '-webkit-transform 0.5s ease-in-out',
    };
    return (
      <div>
        <h3>Similar Listings</h3>
        <span>
          <button type="button" onClick={() => this.slideRight()}>LAST</button>
          <button type="button" onClick={() => this.slideLeft()}>NEXT</button>
        </span>
        <div className="wrap">
          <div className="carousel" style={cssStyle}>
            <div>Listing 1</div>
            <Listing listing={listings[2]} />
            <div>Listing 3</div>
            <div>Listing 4</div>
            <div>Listing 5</div>
            <div>Listing 6</div>
            <div>Listing 7</div>
            <div>Listing 8</div>
            <div>Listing 9</div>
            <div>Listing 10</div>
            <div>Listing 11</div>
            <div>Listing 12</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

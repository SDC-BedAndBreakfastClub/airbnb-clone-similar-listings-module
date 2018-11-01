
import axios from 'axios';
import React from 'react';
import Listing from './Listing';
import '../styles/appsandbox.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      // left: 0,
      // style: {
      //   'background-color': 'DodgerBlue',
      //   color: 'white',
      //   width: '335px',
      //   margin: '9px',
      //   'text-align': 'center',
      //   'line-height': '325px',
      //   'font-size': '30px',
      //   position: 'relative',
      //   left: `${this.state.left}%`,
      //   transform: 'left(8.3%)',
      //   transition: 'transform 1s',
      // },
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
    const { left } = this.state;
    this.setState({
      left: `${left + 8.3}%`,
    });
  }

  slideRight() {
    const { left } = this.state;
    this.setState({
      left: `${left - 8.3}%`,
    });
  }

  render() {
    const { listings } = this.state;
    return (
      <div>
        <h3>Similar Listings</h3>
        <span>
          <button type="button" onClick={() => this.slideRight()}>LAST</button>
          <button type="button" onClick={() => this.slideLeft()}>NEXT</button>
        </span>
        <div className="wrap">
          <div className="carousel">
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

// <button type="button" onClick={this.changePosition(1)} />

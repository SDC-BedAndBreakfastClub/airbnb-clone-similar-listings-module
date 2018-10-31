
import axios from 'axios';
import React from 'react';
import Photos from './Photos';
import Details from './Details';
import '../styles/app.css';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
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

  render() {
    const { listings } = this.state;
    return (
      <div className="grid-container">
        <h3>Listing</h3>
        <Photos listings={listings} />
        <Details listings={listings} />
      </div>
    );
  }
}

export default Listing;

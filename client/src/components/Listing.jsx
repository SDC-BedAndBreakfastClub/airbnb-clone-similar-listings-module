
import React from 'react';
import Photos from './Photos';
import Details from './Details';
import '../styles/listing.css';

class Listing extends React.Component {
  constructor({ listing }) {
    super();
    this.state = {
      listing,
    };
  }

  render() {
    const { listing } = this.state;
    return (
      <div className="grid-container">
        <div className="photo">
          <Photos listing={listing} />
        </div>
        <div className="details">
          <Details listing={listing} />
        </div>
      </div>
    );
  }
}

export default Listing;

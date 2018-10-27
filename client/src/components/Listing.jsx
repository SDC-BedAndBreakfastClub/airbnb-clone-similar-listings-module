import React from 'react';
import Photos from './Photos';
import Details from './Details';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>Listing</h3>
        <Photos />
        <Details />
      </div>
    );
  }
}

export default Listing;

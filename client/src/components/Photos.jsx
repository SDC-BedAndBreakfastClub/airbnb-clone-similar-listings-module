import React from 'react';

class Photos extends React.Component {
  constructor({ listing }) {
    super({ listing });
    this.state = {
      listing,
    };
  }

  render() {
    const { listing } = this.state;
    return (
      <div className="L1_photo">
        <h3>Photo</h3>
      </div>
    );
  }
}

export default Photos;

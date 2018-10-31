import React from 'react';
// import Listing from './Listing';
import '../styles/appsandbox.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>Similar Listings</h3>
        <div className="wrap">
          <div className="visible-box">
            <div className="outer-container">
              <div>Listing 1</div>
              <div>Listing 2</div>
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
      </div>
    );
  }
}

export default App;

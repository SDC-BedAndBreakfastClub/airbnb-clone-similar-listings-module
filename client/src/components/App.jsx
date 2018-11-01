import React from 'react';
// import Listing from './Listing';
import '../styles/appsandbox.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
    };
    this.changePosition.bind(this);
  }

  changePosition() {
    const { position } = this.state;
    // if (direction > 0) {
    //   this.setState({
    //     position: position + 8.3,
    //   });
    // } else if (direction < 0) {
    //   this.setState({
    //     position: position - 8.3,
    //   });
    // }
    this.setState({
      position: position + 8.3,
    });
  }

  render() {
    const { position } = this.state;
    return (
      <div>
        <h3>Similar Listings</h3>
        <button type="button" onClick={() => this.changePosition()}>NEXT</button>
        <div className="wrap">
          <div className={`carousel position-${position * 8.3}`}>
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
    );
  }
}

export default App;

// <button type="button" onClick={this.changePosition(1)} />

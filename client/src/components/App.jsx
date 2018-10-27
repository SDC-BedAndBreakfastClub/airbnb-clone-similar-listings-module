import React from 'react';
import Listing from './Listing';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>App</h3>
        <Listing />
      </div>
    );
  }
}

export default App;

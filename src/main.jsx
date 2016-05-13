import React from 'react';
import ReactDOM from 'react-dom';

// import { Router, Route, browserHistory, Redirect } from 'react-router'

//components
import Timer from './components/timer.jsx';

require('./styles/main.scss');
require('./styles/reset.scss');

class App extends React.Component {
  constructor(){
    super()

    this.state = { start: false }

  }

  render() {
    return (
  <div>
  <button onClick = {this.state}>Click to continue</button>

  </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('react-app'));

import React from 'react';

export default class Timer extends React.Component{

  constructor(props){
    super(props);
    this.state = {secondsElapsed: 60};
    this._tick = this._tick.bind(this);
  }
_tick(){
  this.setState({secondsElapsed:this.state.secondsElapsed -1 })
  if (this.state.secondsElapsed === 0){
    clearInterval(this.interval)
    }
  }

componentDidMount(){
  this.interval = setInterval(this._tick, 1000);
  }

componenetWillUnmount(){
  clearInterval(this.interval);
  }

render(){
  return(
    <div>
     {this.state.secondsElapsed}
    </div>
    )
  }
}

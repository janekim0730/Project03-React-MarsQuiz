import React from 'react';

export default class Timer extends React.Component{

  constructor(){
    super();
    this.state = {seconds: 60};
  }

  componentDidMount(){
    this.setState({seconds: 60}) //when reload the page, reset the timer again
    this.timer = setInterval(() => {
      if(this.state.seconds > 0){
      this.setState({seconds: this.state.seconds-1})
      }
    }, 1000)
  }

  _changeDisplay(){
    let minutes = Math.floor(this.state.seconds/60) //Math.floor = no decimal places
    let seconds = Math.floor(this.state.seconds%60) //only give remainder ex. 25 % 7 = 25 - (7*3) = 4
    if(seconds < 10){
      seconds = '0' + seconds;
    }
    let countdown = minutes + ':' + seconds;
    return countdown;
  }

  _failPage(){
    this.props.switchPage('failure');
  }

  componentDidUpdate(prevProps, PrevState){
    if(this.state.seconds === 0){
      this._failPage(); //can directly be called because it is in the same class
      clearInterval(this.timer);
    }
  }

  componentWillUnmount(){
    clearInterval(this.timer); //clear the time if the test is finished before the set time
  }

render(){
  return(
    <div className="timer">
     <p>{this._changeDisplay()}</p>
    </div>
    )
  }
}

import React from 'react';

export default class Rejected extends React.Component{

_nextPage(){
  this.props.switchPage('welcome');
}

componentDidMount(){
  let time = 0;

  this.timer = setInterval(() => {
    time++;

    if(time === 4){
      this._nextPage();
    }
  }, 1000)
}

componentWillUnmount(){
  clearInterval(this.timer);
}

  render(){
    return(
      <div className="blink">
        <h2>Rejected!</h2>
      </div>
    )
  }
}

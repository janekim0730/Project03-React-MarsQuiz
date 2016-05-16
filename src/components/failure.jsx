import React from 'react';

export default class Rejected extends React.Component{

_nextPage(){
  this.props.switchPage('welcome');
}

componentDidMount(){
  let time = 0;

  this.timer = setInterval(() => {
    time++;

    if(time === 3){
      this._nextPage();
    }
  }, 1000)
}

componentWillUnmount(){
  clearInterval(this.timer);
}

  render(){
    return(
      <div className="reject">
        <p>Rejected!</p>
      </div>
    )
  }
}

import React from 'react';

export default class Evaluation extends React.Component{

 _beginEval(){
   this.props.switchPage('questions');
 }

    render(){
      return(
        <div>
          <button onClick={this._beginEval.bind(this)}>Begin Evaluation</button>
        </div>
      )
    }
  }

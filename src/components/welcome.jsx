import React from 'react';

export default class Welcome extends React.Component {

  _nextPage(){
    this.props.switchPage('evaluation');
  }

     render(){
       return(
         <div>
           <button onClick={this._nextPage.bind(this)}>Take Test</button>
         </div>
       )
     }
   }

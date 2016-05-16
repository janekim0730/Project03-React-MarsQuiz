import React from 'react';
import {browserHistory} from 'react-router';

export Rejected class Rejected extends React.Component{

componentDidMount(){
  setTimeout(){
    browserHistory.push('/welcome')}, 10000);
  }
}
 render(){
   return(
     <div className="result-msg">
       <h2 className="rejected">Rejected!</h2>
     </div>
   ;)
 }
}

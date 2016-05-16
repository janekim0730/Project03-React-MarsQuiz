import React from 'react';
import ReactDOM from 'react-dom';

//import components
import Welcome from './components/welcome';
import Evaluation from './components/evaluation';
import Accepted from './components/success';
import Rejected from './components/failure';
import Questions from './components/questions';


require('./styles/reset.scss');
require('./styles/main.scss');

class MarsApp extends React.Component {

  constructor(){
    super();
    this.state={ page: 'welcome'}
  }

_switchPage(page){
    this.setState({page})
}

_renderPage(){
  switch(this.state.page){
    case 'welcome':
      return(<Welcome switchPage={this._switchPage.bind(this)}/>)
    case 'evaluation':
     return(<Evaluation switchPage={this._switchPage.bind(this)} />)
    case 'questions':
     return(<Questions switchPage={this._switchPage.bind(this)} />)
    case 'success':
      return(<Accepted switchPage={this._switchPage.bind(this)}/>)
    case 'failure':
      return (<Rejected switchPage={this._switchPage.bind(this)}/>)

  }
}

  render(){
    return(
      <div>
        {this._renderPage()}
      </div>
    );
  }
}

 class Timer extends React.Component{

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

   componenetWillUnmount(){
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


ReactDOM.render(<MarsApp />, document.getElementById('react-app'));

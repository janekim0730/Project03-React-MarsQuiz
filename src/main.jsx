import React from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route, browserHistory, Redirect from 'react-router'};
//
// //Components
// import Welcome from './components/welcome.jsx';
// import Timer from './components/timer.jsx';
// import Evaluation './componenets/evaluation.jsx';
// import Questions from './components/questions.jsx';
// import Accepted from './components/success.jsx';
// import Rejected from './components/failure.jsx';

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

class Welcome extends React.Component {

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

 class Evaluation extends React.Component{

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

 class Questions extends React.Component{
   constructor(){
     super();
     this.state={
        questions:[
          {question: 'What color is the sailor Mars?', answer: 'red', result: false},
          {question: 'What temperature is the Mars', answer: 'hot', result: false},
          {question: 'How long is a year on Mars? ', answer: '120', result: false}
        ],
        numbers: 0
     }
   }

   _nextSuccess(){
     this.props.switchPage('success');
   }

   _nextFailure(){
     this.props.switchPage('failure');
   }

   _checkResult(){
     let correctAnswers = 0;
     const countResult = this.state.questions.map((resultList) => {
      if(resultList.result === true){
        correctAnswers++;
      }
    });

      if(correctAnswers > this.state.questions.length/2){
        this._nextSuccess();
      }else{
        this._nextFailure();
      }
 }

 componentDidUpdate(prevProps, PrevState){
   if(this.state.numbers === this.state.questions.length){
     this._checkResult();
     this.setState({numbers:0})
   }
 }

   _nextQuestions(event){
     event.preventDefault()

     if(this.refs.answers.value === this.state.questions[this.state.numbers].answer){

        const newQuestions = this.state.questions.map((questionnaire) => {
          if(this.state.questions[this.state.numbers] === questionnaire){
            questionnaire.result = true;
          }
        return questionnaire;
        });
     }

     this.setState({numbers: this.state.numbers+1});
     this.refs.answers.value = '';

   }

   render(){
    return(
    <div className="main">{this.state.numbers < 3 ?
      <div className ="main-content">
        <div className="timer-box"><Timer switchPage={this._nextFailure.bind(this)}/>
        </div>
            <div className="question-box">
              <div className="narrative">{this.state.questions[this.state.numbers].question}
              </div>
            <form>
              <input className="answer-box" ref="answers"></input>
              <button onClick={this._nextQuestions.bind(this)}>Submit</button>
            </form>
            </div>
      </div>: ''}
    </div>
   )
  }
 }

 class Accepted extends React.Component{
   render(){
     return(
       <div>
         <p>Accepted!</p>
       </div>
     )
   }

 }

 class Rejected extends React.Component{
   render(){
     return(
       <div>
         <p>Rejected!</p>
       </div>
     )
   }
 }

ReactDOM.render(<MarsApp />, document.getElementById('react-app'));

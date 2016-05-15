import React from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route, browserHistory, Redirect from 'react-router'};
//
// //Components
// import Welcome from './components/welcome.jsx';
// import Timer from './components/timer.jsx';
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
     <div className="timer">
      {this.state.secondsElapsed}
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
    <div>{this.state.numbers < 3 ?
      <div>
        <Timer />
      <div className="narrative">{this.state.questions[this.state.numbers].question}</div>
      <form>
      <input className="answerbox" ref="answers"></input>
      <button onClick={this._nextQuestions.bind(this)}>Submit</button>
      </form></div> : ''}
    </div>
   )
  }
 }

 class Accepted extends React.Component{
   render(){
     return(
       <div>
         <h1>Accepted!</h1>
       </div>
     )
   }

 }

 class Rejected extends React.Component{
   render(){
     return(
       <div>
         <h1>Rejected!</h1>
       </div>
     )
   }
 }

ReactDOM.render(<MarsApp />, document.getElementById('react-app'));

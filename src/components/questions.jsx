import React from 'react';
import Timer from './timer';

export default class Questions extends React.Component{
  constructor(){
    super();
    this.state={
       questions:[
         {question: 'What color is the Sailor Mars?', answer: 'red', result: false},
         {question: 'How many earths can fit in Mars', answer: '318', result: false},
         {question: 'How long is a year on Mars?', answer: '687', result: false}
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

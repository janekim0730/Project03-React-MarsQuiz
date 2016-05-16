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

ReactDOM.render(<MarsApp />, document.getElementById('react-app'));

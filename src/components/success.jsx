import React from 'react';

export default class Accepted extends React.Component{
    render(){
      return(
        <div>
        <div className="content-area success">
          <div className="launch">
            <i class="fa fa-space-shuttle" aria-hidden="true"></i>
          </div>
          <h2 className="blink">Accepted!</h2>
        </div>
        </div>
      )
    }

  }

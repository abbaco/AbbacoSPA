import React, { Component } from 'react';
import './App.css';
import CashFlowApp from './components/CashFlowApp';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faPlusCircle, faMinusCircle, faBalanceScale } from '@fortawesome/free-solid-svg-icons'
 
library.add(fab, faCheckSquare, faCoffee, faPlusCircle, faMinusCircle, faBalanceScale )

class App extends Component {
  render() {
    return (
      <div className="container">
        <CashFlowApp />
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import CashFlowsContainer from './pages/CashFlows.container';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPlusCircle, faMinusCircle, faBalanceScale } from '@fortawesome/free-solid-svg-icons'

library.add(faPlusCircle, faMinusCircle, faBalanceScale)

function App() {
  return (
      <CashFlowsContainer/>
  );
}

export default App;

import React from 'react';
import './App.css';
import CashFlowsContainer from './pages/CashFlows.container';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPlusCircle, faMinusCircle, faBalanceScale, faTrash, faArchive, faSave } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';

library.add(faPlusCircle, faMinusCircle, faBalanceScale, faTrash, faSave)

function App() {
  return (
    <Container className="col">
      <CashFlowsContainer/>
    </Container>
  );
}

export default App;

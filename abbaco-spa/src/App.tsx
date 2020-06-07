import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchFormComponent from './components/SearchForm.component';
import AmountComponent from './components/Amount.component';
import CashFlowsContainer from './pages/CashFlows.container';

function App() {
  return (
    <Container>

      <Row>
        <Col><AmountComponent/></Col>
        <Col><AmountComponent/></Col>
        <Col><AmountComponent/></Col>
      </Row>

      <Row>
        <Col><SearchFormComponent/></Col>
      </Row>

      <Row>
        <Col><CashFlowsContainer/></Col>
      </Row>

    </Container>
  );
}

export default App;

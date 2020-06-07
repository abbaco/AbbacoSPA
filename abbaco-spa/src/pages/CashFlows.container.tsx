import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CashFlowForm from '../components/CashFlowForm.component';
import CashFlowList from '../components/CashFlowList.component';

function CashFlowsContainer() {
  return (
    <>

      <Row>
        <Col><CashFlowForm/></Col>
      </Row>

      <Row>
        <Col><CashFlowList/></Col>
      </Row>

    </>
  );
}

export default CashFlowsContainer;

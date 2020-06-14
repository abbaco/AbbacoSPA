import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CashFlowForm from '../components/CashFlowForm.component';
import CashFlowList from '../components/CashFlowList.component';
import { ICashFlow } from '../api/models/CashFlow.model';
import CashFlowDataService from '../api/services/CashFlows.service';

class CashFlowsContainer extends Component<{}, { cashFlows: Array<ICashFlow> }> {
  constructor(props: any) {
    super(props)
    this.state = { cashFlows: new Array<ICashFlow>() }
  }
  public componentDidMount(): void {
    this.refreshCashFlows();
  }

  public refreshCashFlows(): void {
    CashFlowDataService.getAllCashFlows()
        .then(
            response => {
                this.setState({ cashFlows: response.data._embedded.cashFlowDtoList })
            }
        )
  }

  render() {
    return (
    <>
      <Row>
        <Col><CashFlowForm refreshCashFlows={ this.refreshCashFlows.bind(this) }/></Col>
      </Row>

      <Row>
        <Col><CashFlowList cashFlows={ this.state.cashFlows } /></Col>
      </Row>

    </>
  );
}
}

export default CashFlowsContainer;

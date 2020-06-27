import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CashFlowForm from '../components/CashFlowForm.component';
import CashFlowList from '../components/CashFlowList.component';
import { ICashFlow } from '../api/models/CashFlow.model';
import CashFlowDataService from '../api/services/CashFlows.service';
import SearchFormComponent from '../components/SearchForm.component';
import AmountComponent from '../components/Amount.component';

class CashFlowsContainer extends Component<{}, { cashFlows: Array<ICashFlow>, wonAmount: number, balanceAmount: number, lostAmount: number }> {
  constructor(props: any) {
    super(props)
    this.state = { 
      cashFlows: new Array<ICashFlow>(),
      wonAmount: 0,
      balanceAmount: 0,
      lostAmount: 0
    }

    this.setAmounts = this.setAmounts.bind(this)
  }
  public componentDidMount(): void {
    this.refreshCashFlows();
  }

  public refreshCashFlows(filterValues?: any): void {
    CashFlowDataService.getAllCashFlows(filterValues)
        .then(
            response => {
                this.setState({ cashFlows: response.data._embedded?.cashFlowDtoList })
                this.setAmounts(response.data._embedded?.cashFlowDtoList)
            }
        )
  }

  private setAmounts(cashFlows: Array<ICashFlow>){
    let won: number = 0;
    let lost: number = 0;

    if(cashFlows){
    cashFlows.forEach(cashFlow => {
      if (cashFlow.cashAmount && cashFlow.cashAmount > 0){
        won = won + cashFlow.cashAmount
      }
      else if (cashFlow.cashAmount && cashFlow.cashAmount < 0){
        lost = lost + cashFlow.cashAmount
      }
    });
  }

    this.setState({ 
      wonAmount: won,
      lostAmount: lost,
      balanceAmount: won+lost })
  }

  render() {
    return (
    <>      
        <Row>
          <Col id="sidebar-wrapper" className="col-3">
            <SearchFormComponent refreshCashFlows={this.refreshCashFlows.bind(this)} />
          </Col>

          <Container className="col-9">
            <Row>
              <Col><AmountComponent className="text-success" amount={this.state.wonAmount} iconName="plus-circle" /></Col>
              <Col><AmountComponent className="text-primary" amount={this.state.balanceAmount} iconName="balance-scale" /></Col>
              <Col><AmountComponent className="text-danger" amount={this.state.lostAmount} iconName="minus-circle" /></Col>
            </Row>

            <Row>
              <Col><CashFlowForm refreshCashFlows={this.refreshCashFlows.bind(this)} /></Col>
            </Row>

            <Row>
              <Col><CashFlowList refreshCashFlows={this.refreshCashFlows.bind(this)} cashFlows={this.state.cashFlows} /></Col>
            </Row>
          </Container>
        </Row>
    </>
  );
}
}

export default CashFlowsContainer;

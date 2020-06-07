import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import CashFlowDataService from '../api/services/CashFlows.service';
import { ICashFlow } from '../api/models/CashFlow.model';

class CashFlowList extends Component<{}, { cashFlows: Array<ICashFlow> }> {

  constructor(props: any) {
    super(props)
    this.state = { cashFlows: new Array<ICashFlow>() }
    this.refreshCashFlows = this.refreshCashFlows.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  public componentDidMount(): void {
      this.refreshCashFlows();
  }

  public formatDate(dateInput: Date | undefined): string {
    const date = new Date (dateInput as unknown as string)

    return date.toLocaleDateString();
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
        <Container>
          <Table responsive>

            <thead>
              <tr>
                <th>Title</th>
                <th>Classification</th>
                <th>Date</th>
                <th>Amount</th>
                <th>#</th>
              </tr>
            </thead>

            <tbody>
              {
                this.state.cashFlows.map(
                  cashFlow =>
                    <tr key={cashFlow.id}>
                      <td>{cashFlow.title}</td>
                      <td>{cashFlow.classification}</td>
                      <td>{this.formatDate(cashFlow.creationDate)}</td>
                      <td>{cashFlow.cashAmount}</td>
                      <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                )
              }
            </tbody>
          </Table>
        </Container>
    )
  }
}

export default CashFlowList;
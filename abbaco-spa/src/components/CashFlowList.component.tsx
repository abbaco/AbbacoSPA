import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { ICashFlow } from '../api/models/CashFlow.model';

class CashFlowList extends Component<{ cashFlows: Array<ICashFlow> }, {}> {

  constructor(props: any) {
    super(props)

    this.formatDate = this.formatDate.bind(this);
  }

  public formatDate(dateInput: Date | undefined): string {
    const date = new Date (dateInput as unknown as string)

    return date.toLocaleDateString();
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
                this.props.cashFlows?.map(
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
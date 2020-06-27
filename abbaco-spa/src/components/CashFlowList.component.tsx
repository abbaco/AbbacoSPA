import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { ICashFlow } from '../api/models/CashFlow.model';
import CashFlowDataService from '../api/services/CashFlows.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CashFlowList extends Component<{ cashFlows: Array<ICashFlow>, refreshCashFlows: any }, {}> {

  constructor(props: any) {
    super(props)

    this.formatDate = this.formatDate.bind(this);
  }

  public formatDate(dateInput: Date | undefined): string {
    const date = new Date (dateInput as unknown as string)

    return date.toLocaleDateString();
  } 

  public deleteCashFlowClicked(id: number | undefined): void {
    if (!id) return;

    CashFlowDataService.deleteCashFlow(id)
        .finally(
            () => { this.props.refreshCashFlows() }
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
                <th></th>
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
                      <td>
                        <button className="btn" onClick={() => this.deleteCashFlowClicked(cashFlow.id)}>
                          <FontAwesomeIcon style={{ fontSize: 20 }} className="text-danger" icon="trash" />
                        </button>
                      </td>
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
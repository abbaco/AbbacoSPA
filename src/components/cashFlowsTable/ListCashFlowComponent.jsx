import React, { Component } from 'react'
import CashFlowDataService from '../../services/CashFlowDataService';

class ListCashFlowComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            message: null
        }
        this.deleteCashFlowClicked  = this.deleteCashFlowClicked.bind(this)
    }

    deleteCashFlowClicked(id) {
        CashFlowDataService.deleteCashFlow(id)
            .then(
                response => {
                    this.setState({ message: `Delete of cashFlow ${id} Successful` })
                    this.props.refreshCashFlows()
                }
            )

    }

    render() {
        return (
            <div className="container">
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Cash</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.cashFlows.map(
                                    cashFlow =>
                                        <tr key={cashFlow.id}>
                                            <td>{cashFlow.creationDate}</td>
                                            <td>{cashFlow.cash}</td>
                                            <td>{cashFlow.cashFlowDescription}</td>
                                            <td>{cashFlow.cashFlowGroup}</td>
                                            <td><button className="btn btn-danger" onClick={() => this.deleteCashFlowClicked(cashFlow.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListCashFlowComponent
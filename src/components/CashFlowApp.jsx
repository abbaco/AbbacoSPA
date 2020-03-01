import React, { Component } from 'react';
import ListCashFlowComponent from './cashFlowsTable/ListCashFlowComponent';
import AddCashFlowComponent from './cashFlowsTable/AddCashFlowComponent';
import SearchCashFlowComponent from './cashFlowsTable/SearchCashFlowComponent';
import BalanceSheetComponent from './balanceSheet/BalanceSheetComponent';
import CashFlowDataService from '../services/CashFlowDataService';
import {Tabs, Tab} from 'react-bootstrap'

class CashFlowApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
          cashFlows: [],
          moneyWon: 0,
          moneyLost: 0,
          moneyBalance: 0
        };
        this.refreshCashFlows = this.refreshCashFlows.bind(this)
        this.updateBalance = this.updateBalance.bind(this)
    }

    componentDidMount() {
        this.refreshCashFlows();
    }

    updateBalance() {
        this.setState({
            moneyWon: 0,
            moneyLost: 0,
            moneyBalance: 0
        })
        this.state.cashFlows.forEach(cashFlow => {
          if (cashFlow.cash > 0) {
            this.setState({ moneyWon: this.state.moneyWon + cashFlow.cash });
          } else {
            this.setState({ moneyLost: this.state.moneyLost - cashFlow.cash });
          }
        });
    
        this.setState({ moneyBalance: this.state.moneyWon - this.state.moneyLost });
      }

    refreshCashFlows() {
        CashFlowDataService.retrieveAllCashFlows()
            .then(
                response => {
                    this.setState({ cashFlows: response.data })
                    this.updateBalance();
                }
            )
    }

    refreshSearchedCashFlows(retrievedCashFlows) {
      this.setState({ cashFlows: retrievedCashFlows.data })
      this.updateBalance();
  }

    render() {
        return (
          <>
            <BalanceSheetComponent
              moneyWon={this.state.moneyWon}
              moneyLost={this.state.moneyLost}
              moneyBalance={this.state.moneyBalance}
            />

            <Tabs defaultActiveKey="search" id="uncontrolled-tab-example">
              <Tab eventKey="search" title="Search">
                <SearchCashFlowComponent
                  refreshSearchedCashFlows={this.refreshSearchedCashFlows.bind(this)}
                />
              </Tab>
              <Tab eventKey="add" title="Add">
                <AddCashFlowComponent
                  refreshCashFlows={this.refreshCashFlows.bind(this)}
                />
              </Tab>
            </Tabs>

            <ListCashFlowComponent
              cashFlows={this.state.cashFlows}
              refreshCashFlows={this.refreshCashFlows.bind(this)}
            />
          </>
        );
    }
}

export default CashFlowApp
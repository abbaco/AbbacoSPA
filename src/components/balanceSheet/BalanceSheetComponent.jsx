import React, { Component } from "react";
import MoneyWonComponent from "./MoneyWonComponent";
import MoneyLostComponent from "./MoneyLostComponent";
import MoneyBalanceComponent from "./MoneyBalanceComponent";

class BalanceSheetComponent extends Component {
  render() {
    return (
      <>
        <div>
          <div className="container">
            <div className="row">
              <div style={{ fontSize: 80 }} className="col">
                <MoneyWonComponent moneyWon={this.props.moneyWon} />
              </div>
              <div style={{ fontSize: 80 }} className="col">
                <MoneyLostComponent moneyLost={this.props.moneyLost} />
              </div>
              <div style={{ fontSize: 80 }} className="col">
                <MoneyBalanceComponent moneyBalance={this.props.moneyBalance} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BalanceSheetComponent;

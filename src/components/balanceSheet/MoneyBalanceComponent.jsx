import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MoneyBalanceComponent extends Component {
    
    render() {
        return (
          <>
            <FontAwesomeIcon className="text-primary" icon="balance-scale" />
            <span>{this.props.moneyBalance}</span>
          </>
        );
    }
}

export default MoneyBalanceComponent
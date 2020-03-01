import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MoneyLostComponent extends Component {
    
    render() {
        return (
          <>
            <FontAwesomeIcon className="text-danger" icon="minus-circle" />
            <span>{this.props.moneyLost}</span>
          </>
        );
    }
}

export default MoneyLostComponent
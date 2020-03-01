import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MoneyWonComponent extends Component {
    
    render() {
        return (
            <>
                <FontAwesomeIcon className="text-success"  icon="plus-circle" />
                <span>{ this.props.moneyWon }</span>
            </>
            
        )
    }
}

export default MoneyWonComponent
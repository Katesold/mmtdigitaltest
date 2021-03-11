import React from 'react';
import PropTypes from 'prop-types';
import './Total.scss';

const Total = ({ total, clearAll }) => {

    return (
        <div className="total-container">
          <p className="total-container__price">£ {total.toFixed(2)}</p>
          <div className="total-container__clear-checkout">
            <p aria-label="Clear items" className="total-container__clear" onClick={clearAll}>Clear</p>
            <button aria-label="Navigate to Check out" onClick={() => alert('Navigate to Checkout')}>Check out <span> &#11166;</span> </button> 
          </div>
        </div>
    )
}

Total.defaultProps = {
    total: 0,
    clearAll: () => {}
}

Total.propTypes = {
    total: PropTypes.number.isRequired,
    clearAll: PropTypes.func.isRequired
}

export default Total;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Total from './Total';
import Loading from './loading.gif';
import './Basket.scss'

const Basket = ({ data }) => {

    const [basketData, setBasketData] = useState([]);
    const [amountForAll, setAmountForAll] = useState({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1 });
    const [prices, setPrices] = useState({ 1: 0 });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const copyOfData = [...data];
        if (data.length) {
            const reducedData = copyOfData.filter((data, i) => i < 10);
            setBasketData(reducedData);

            const amountWithKeys = {};
            const allPrices = [];
            const pricesValuesWithKeys = {};
            reducedData.forEach(bData => {
                amountWithKeys[bData.id] = 1;
                pricesValuesWithKeys[bData.id] = bData.price;
                allPrices.push(bData.price);
            });
            setAmountForAll(amountWithKeys);
            setPrices(pricesValuesWithKeys);
            const total = allPrices.reduce((a, b) => a + b, 0);
            setTotal(total);
        }
    }, [data]);

    const handleRemoveClick = (id) => {
        const newData = [...basketData];
        const newBasketData = newData.filter(data => data.id !== id);
        const newAmounts = {};
        const allPrices = [];
        newBasketData.forEach(bData => {
            if (id !== bData.id) {
                newAmounts[bData.id] = amountForAll[bData.id];
                allPrices.push(bData.price);
            }

        });
        setBasketData(newBasketData);
        const total = allPrices.reduce((a, b) => a + b, 0);
        setTotal(total);
    }

    // changes amount, prices, total
    const handleAmountChange = (e, id) => {
        const newData = [...basketData];
        const newAmounts = { ...amountForAll };
        const pricesValuesWithKeys = { ...prices };
        newData.forEach(bData => {
            if (id === bData.id) {
                newAmounts[bData.id] = Number(e.target.value);
                pricesValuesWithKeys[bData.id] = Number(e.target.value) * bData.price;
            }
        });
        setAmountForAll(newAmounts);
        setPrices(pricesValuesWithKeys);
        const allPrices = Object.values(pricesValuesWithKeys);
        const total = allPrices.reduce((a, b) => a + b, 0);
        setTotal(total);
    }

    // changes amount, prices, total
    const clearAll = () => {
        const newAmounts = {};
        const zeroPrices = {};
        basketData.forEach(bData => {
            newAmounts[bData.id] = 0;
            zeroPrices[bData.id] = 0;
        });
        setAmountForAll(newAmounts);
        setTotal(0);
        setPrices(zeroPrices);
    }

    return (
        <div role="main" className="basket-container">
            <div className="basket-container__items">
                {basketData.length > 0 ? basketData.map(data => {
                    return (
                        <div key={data.id} className="basket-container__item">
                            <p className="basket-container__name">{data.title}</p>
                            <input aria-label="Change amount of item in the basket" type="number" className="basket-container__amount" min="0" onChange={(e) => handleAmountChange(e, data.id)} value={amountForAll[data.id]} />
                            <div className="basket-container__price-container">
                                {prices[data.id] === data.price ? <p className="basket-container__price">£{data.price}</p> : <p className="basket-container__price">£{prices[data.id]}</p>}
                                <p aria-label="Remove current item" className="basket-container__remove" onClick={() => handleRemoveClick(data.id)}>X</p>
                            </div>
                            <hr></hr>
                        </div>)
                }) : <div style={{ marginTop: "150px" }}>
                        <img alt="loading" src={Loading} height="100px"></img>
                        <p>Loading...</p>
                    </div>}
            </div>
            {basketData.length > 0 && <Total total={total} clearAll={clearAll} />}
        </div>
    )
}

Basket.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
        price: PropTypes.number,
        title: PropTypes.string,
        id: PropTypes.number.isRequired
      }))
}

export default Basket;
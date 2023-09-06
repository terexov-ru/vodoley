import React from 'react'
import './Discount.css'

const calculateCircleFillPercentage = (visits) => {
    if (visits === 0) {
        return 0;
    } else if (visits === 1) {
        return 0;
    } else if (visits === 2) {
        return 50;
    } else if (visits === 3) {
        return 100;
    } else {
        const remainder = visits % 3;
        if (remainder === 1) {
            return 0;
        } else if (remainder === 2) {
            return 50;
        } else if (remainder === 0) {
            return 100;
        }
    }
};

export const Discount = ({discount}) => {
    const circleFillPercentage = calculateCircleFillPercentage(discount.visits);

    return (
        <div className='Discount'>
            <h1 className='DiscountTitle'>{discount.title}</h1>
            <h1 className='DiscountOptions'>
                {/*Еще {5-discount.visits} раза до скидки 5%*/}
                Ещё {discount.visits % 3 === 0 ? "3 раза" : `${3 - discount.visits % 3} ${3 - discount.visits % 3 === 1 ? "раз" : "раза"}`} до скидки в 15% процентов
            </h1>
            <div className='ProgressLine'>
                <div
                    style={{
                        background: "#006BE5",
                        height: '8px',
                        width: `${circleFillPercentage}%`,
                        borderRadius: '26px'
                    }}
                    className='ProgressComplete'>
                </div>
            </div>
            <div className='DiscountTable'>
                <a>5%</a>
                <a>10%</a>
                <a>15%</a>
            </div>
        </div>
    )
}

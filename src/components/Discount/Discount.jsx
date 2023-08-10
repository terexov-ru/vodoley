import React from 'react'
import './Discount.css'

export const Discount = ({discount}) => {
    return (
        <div className='Discount'>
            <h1 className='DiscountTitle'>{discount.title}</h1>
            <h1 className='DiscountOptions'>Еще {5-discount.visits} раза до скидки 5%
            </h1>
            <div className='ProgressLine'>
                <div
                    style={{
                        background: "#006BE5",
                        height: '8px',
                        width: `${10 * (discount.visits)}%`,
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

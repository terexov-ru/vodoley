import React from 'react'
import './Discount.css'

export const Discount = (props) => {
  return (
    <div className='Discount'>
        <h1 className='DiscountTitle'>{props.title}</h1>
        <h1 className='DiscountOptions'>{props.options}</h1>
        <div className='ProgressLine'>
            <div className='ProgressComplete'></div>
        </div>
        <div className='DiscountTable'>
            <a>5%</a>
            <a>10%</a>
            <a>15%</a>
        </div>
    </div>
  )
}

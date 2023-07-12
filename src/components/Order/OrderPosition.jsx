import './Order.css'

import React from 'react'

export const OrderPosition = ({positions}) => {
  return (
    <tr className='positionElement'>
        <td className='positionName'>{positions.title}</td>
        <td className='positionPrice'>{positions.price}</td>
    </tr>
  )
}

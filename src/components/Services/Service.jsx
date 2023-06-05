import './Service.css'

import React from 'react'

export const Service = (props) => {
  return (
    <div className='Service'>
        <div>
            <div className='ServiceTitle'>{props.title}</div>
            <div className='ServicePrice'>{props.price}</div>
        </div>
        <button className='ServiceButton'>+</button>
    </div>
  )
}

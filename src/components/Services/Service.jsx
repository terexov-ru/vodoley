import './Service.css'

import React from 'react'

export const Service = ({service}) => {
  return (
    <div className='Service'>
        <div className={service.type}>
            <div className='ServiceTitle'>{service.title}</div>
            <div className='ServicePrice'>{service.price}</div>
        </div>
        <div className='ServiceButton'>
          <input className='checkboxServices' id={service.id} type="checkbox"/>
          <label className='labelServices' for={service.id}/>   
        </div>
    
    </div>
  )
}

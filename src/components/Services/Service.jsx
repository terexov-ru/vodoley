import './Service.css'

import React, { Fragment } from 'react'
import Add from '../../media/Add.png'
import Added from '../../media/Added.png'

export const Service = (props) => {
/*  const handleClick = (e) => {
    const buttons = document.querySelectorAll('button')
    for (let i = 0; i < buttons.length; i++) {
      if(buttons[i].classList.contains('added')) {
        props.icon = Added
      } else {
        props.icon = Add
      }
    }
    if(e.currentTarget.classList.contains('added')) {
      e.currentTarget.classList.remove("added");
    } else {
      e.currentTarget.classList.add("added");
    }
  }; */

  return (
    <div className='Service' id={props.id}>
        <div>
            <div className='ServiceTitle'>{props.title}</div>
            <div className='ServicePrice'>{props.price}</div>
        </div>
        <img className='ServiceButton' src={Add} alt="add" width={24} height={24}/>
    </div>
  )
}

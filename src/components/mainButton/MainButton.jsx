import React from 'react'
import {NavLink} from 'react-router-dom'
import "./mainButton.css"

export const MainButton = (props) => {
  return (
    <div className='mainButton'>
      <NavLink to={props.goto}>
        {props.title}
      </NavLink>
    </div>
  )
}

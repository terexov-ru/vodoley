import React from 'react'
import './MainPageButtons.css'
import { NavLink } from 'react-router-dom'

export const MainPageButtons = (props) => {
  return (
    <div className="MainPageButtons">
        <NavLink to={props.goto}>
            <div className='circul'>
                <img className='mainPict' src={props.pict}/>
            </div>
            <h1>{props.title}</h1>
        </NavLink>
    </div>
  )
}

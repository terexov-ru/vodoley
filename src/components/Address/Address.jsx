import React from 'react'
import './Address.css'
import MapPin from '../../media/Map_Pin.png'
import Clock from '../../media/ClockBlue.png'
import Map from '../../media/Map.png'
import { NavLink } from 'react-router-dom'

export const Address = ({adresses}) => {
  return (
    <div className='Address' id={adresses.id}>
        <div className='location'>
            <img id='MapPin' src={MapPin} />
            <span id='markspan'>{adresses.address}</span>
        </div>
        <div className='time'>
            <img id='Clock' src={Clock} />
            <span id='clockspan'>{adresses.times}</span>
        </div>
        <div className='serviceButtonSet'>
            <NavLink to='/makeorder'>
              <button className='booking'>Записаться</button>
            </NavLink>
            <button className='showOnMap'>
              <img src={Map}/>
            </button>
        </div>
    </div>
  )
}

import React from 'react'
import './Address.css'
import MapPin from '../../media/Map_Pin.png'
import Clock from '../../media/ClockBlue.png'
import Map from '../../media/Map.png'

export const Address = (props) => {
  return (
    <div className='Address'>
        <div className='location'>
            <img id='MapPin' src={MapPin} />
            <span id='markspan'>{props.address}</span>
        </div>
        <div className='time'>
            <img id='Clock' src={Clock} />
            <span id='clockspan'>{props.times}</span>
        </div>
        <div className='serviceButtonSet'>
            <button className='booking'>Записаться</button>
            <button className='showOnMap'>
              <img src={Map}/>
            </button>
        </div>
    </div>
  )
}

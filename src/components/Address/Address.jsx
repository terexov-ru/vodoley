import React from 'react'
import './Address.css'
import mark1 from '../../media/MarkVector.png'
import mark2 from '../../media/MarkRingVector.png'
import clock1 from '../../media/ClockVector.png'
import clock2 from '../../media/Clock2Vector.png'
import map from '../../media/Map.png'
import map2 from '../../media/map2.png'

export const Address = (props) => {
  return (
    <div className='Address'>
        <div className='location'>
            <img id='mark1' src={mark1} />
            <img id='mark2' src={mark2} />
            <span id='markspan'>{props.address}</span>
        </div>
        <div className='time'>
            <img id='clock1' src={clock1} />
            <img id='mark2' src={clock2}/>
            <span id='clockspan'>{props.times}</span>
        </div>
        <div className='serviceButtonSet'>
            <button className='booking'>Записаться</button>
            <button className='showOnMap'>
              <img id='map1' src={map}/>
              <img id='map2' src={map2}/>
              <img id='map3' src={map2}/>
            </button>
        </div>
    </div>
  )
}

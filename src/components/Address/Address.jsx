import React from 'react'
import './Address.css'
import MapPin from '../../media/Map_Pin.png'
import Clock from '../../media/ClockBlue.png'
import Map from '../../media/Map.png'
import {NavLink} from "react-router-dom";

export const Address = ({ addresses, onShowOnMap, selectedAddress} ) => {

    return (
        <div className='Address' id={addresses.id}>
            <div className='location'>
                <img id='MapPin' src={MapPin} />
                <span id='markspan'>{addresses.address}</span>
            </div>
            <div className='time'>
                <img id='Clock' src={Clock} />
                <span id='clockspan'>{addresses.time}</span>
            </div>
            <div className='serviceButtonSet'>
                <NavLink to={{ pathname: "/makeorder", search: `?address=${encodeURIComponent(addresses.id)}` }}>
                    <button className='booking'>Записаться</button>
                </NavLink>
                <button className='showOnMap' onClick={() => onShowOnMap(addresses)}>
                    <img src={Map}/>
                </button>
            </div>
        </div>
    )
}

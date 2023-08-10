import React from 'react'
import './Address.css'
import MapPin from '../../media/Map_Pin.png'
import Clock from '../../media/ClockBlue.png'
import Map from '../../media/Map.png'

export const Address = ({adresses}) => {
    const handleBookingClick = (addressId) => {
        window.location.href = `/#/makeorder?address=${addressId}`;
    };
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
                <button className='booking' onClick={() => handleBookingClick(adresses.id)}>Записаться</button>
                <button className='showOnMap'>
                    <img src={Map}/>
                </button>
            </div>
        </div>
    )
}

import React from 'react'
import '../pageStyles/AddressesPage.css'
import { Header } from '../components/Header/Header';
import { Address } from '../components/Address/Address';
//import zoom from '../media/Frame10.png'
import mapPict from '../media/Frame18.png'

export const AddressesPage = () => {
  return (
    <div className='AddressPage'>
        <Header title="Услуги" gobackto="/"/>
        <div className='map'>
          <h1 className='addressTitle'>Карта</h1>
          <img className='mapPict' src={mapPict} alt='map'/>
        </div>
        <div className='list'>
          <h1 className='addressTitle'>Список</h1>
          <Address times="9:00 - 21:00" address="Санкт-Петербург, Кондратьевский пр-т, 31" />
          <Address times="9:00 - 21:00" address="Санкт-Петербург, Кондратьевский пр-т, 31" />
        </div>
    </div>
  )
}

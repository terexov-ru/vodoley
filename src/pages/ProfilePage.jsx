import React from 'react'
import '../pageStyles/ProfilePage.css'
import { Header } from '../components/Header/Header';
import { UserInfoblock } from '../components/UserInfoBlock/UserInfoblock';
import { CarInfoblock } from '../components/CarInfoBlock/CarInfoblock';

export const ProfilePage = () => {
  return (
    <div className='ProfilePage'>
        <Header title="Профиль"/>
        <UserInfoblock userName="Константин Константинов" userNumber="89215720187" userTG="@kostyaconst" />
        <CarInfoblock mark='Hyundai' model='Sonata' carNumber="с349тн78" comfirm='1' />
        <button className='DataChange'>Изменить</button>
    </div>
  )
}

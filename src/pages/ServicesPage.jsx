import React from 'react'
import '../pageStyles/ServicesPage.css'
import { Header } from '../components/Header/Header';
import { Service } from '../components/Services/Service';

export const ServicesPage = () => {
  return (
    <div className='ServicesPage'>
        <Header title="Услуги" gobackto="/"/>
        <div className='ServiceButtonSet'>
           <a className='active'>Основные 12</a>
           <a>Специальные 12</a>
        </div>
        <Service title="Мойка - кузов ковры/сушка" price="700 ₽"/>
        <Service title="Мойка - кузов ковры/сушка" price="700 ₽"/>
        <Service title="Мойка - кузов ковры/сушка" price="700 ₽"/>
    </div>
  )
}

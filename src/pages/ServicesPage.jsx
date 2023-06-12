import React from 'react'
import '../pageStyles/ServicesPage.css'
import { Header } from '../components/Header/Header';
import { Service } from '../components/Services/Service';
import CloseCross from '../media/ServiceCloseCross.png'
import { MainButton } from '../components/mainButton/MainButton';

export const ServicesPage = () => {
  const closeHelp = () => {
    let el = document.getElementById('ServiceHelp')
    el.style.display = (el.style.display === 'none') ? 'block' : 'none'
  }

  const handleClick = (e) => {
    let foo = document.querySelectorAll("a");
    for (let i = 0; i < foo.length; i++) {
      foo[i].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

  return (
    <div className='ServicesPage'>
        <Header title="Услуги" gobackto="/"/>
        <div className='ServiceButtonSet'>
           <a className='active' onClick={handleClick}>Основные 12</a>
           <a className='' onClick={handleClick}>Специальные 12</a>
        </div>
        <div id='ServiceHelp' style={{display: 'block',}}>
          <div className='ServiceHelp' >
            <p>Выберете интересующие вас услуги.</p>
            <button className='ServiceCloseCross' onClick={closeHelp}>
              <img src={CloseCross} />
            </button>
          </div>
        </div>
        <Service id='choosenService' title="Мойка - кузов ковры/сушка" price="700 ₽"/>
        <Service title="Мойка - кузов ковры/сушка" price="700 ₽"/>
        <Service title="Мойка - кузов ковры/сушка" price="700 ₽"/>

        <div className='hiddenButton'>
          <MainButton title='Записаться' />
        </div>
    </div>
  )
}

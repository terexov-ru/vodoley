import React from 'react'
import { Header } from '../components/Header/Header';
import '../pageStyles/TipsPage.css'
import {MainButton} from '../components/mainButton/MainButton'
import { TipsOrder } from '../components/TipsOrder/TipsOrder';

export const TipsPage = (props) => {
  //if (!props.currentUser) 
  //  return (
  //    <>
  //      <Header title="Чаевые" gobackto='/' />
  //      <div className='emptyTipList'>У Вас пока нет завершенных записей</div>
  //    </>
  //  ) 
  //else 

  const handleTipsClick = (e) => {
    let tipsButtonList = document.querySelectorAll('#tipsbutton')
    console.log(tipsButtonList)
    //tipsButtonList.push(inputTips)
    for(let i = 0; i < tipsButtonList.length; i++) {
      tipsButtonList[i].classList.remove('activeTip')
    }
    e.currentTarget.classList.add("activeTip");
  }

  return (
    <div className='TipsPage'>
        <Header title="Чаевые" gobackto='/myorders' />
        <TipsOrder />
        <h1 className='tipsAmount'>Размер чаевых</h1>
        <div className='tipsButtonset'>
            <a id='tipsbutton' className='activeTip' onClick={handleTipsClick} >5%</a>
            <a id='tipsbutton' onClick={handleTipsClick}>10%</a>
            <a id='tipsbutton' onClick={handleTipsClick}>15%</a>
            <a id='tipsbutton' onClick={handleTipsClick}>20%</a>
        </div>
        <h1 className='anotherSumTitle'>Своя сумма:</h1>
        <input id='tipsbutton' type='number' className='SumInput' onClick={handleTipsClick}></input>
        <div className='finalSum'>
            <a>Итого</a>
            <a>210 ₽</a>
        </div>
        <MainButton goto="/pay" title="Оплатить" />
    </div>
  )
}

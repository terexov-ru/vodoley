import React from 'react'
import { Header } from '../components/Header/Header';
import '../pageStyles/TipsPage.css'
import {MainButton} from '../components/mainButton/MainButton'

export const TipsPage = (props) => {
  if (!props.currentUser) 
    return (
      <>
        <Header title="Чаевые" gobackto='/' />
        <div className='emptyTipList'>У Вас пока нет завершенных записей</div>
      </>
    ) 
  else return (
    <div className='TipsPage'>
        <Header title="Чаевые" gobackto='/' />
        <table>
            <tbody>
              {props.list.map((item) => (
                <tr key={item.key}>
                  <td>
                    {item.title}
                  </td>
                  <td>
                    {item.sum}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <h1 className='tipsAmount'>Размер чаевых</h1>
        <div className='tipsButtonset'>
            <a className='activeTip'>5%</a>
            <a>10%</a>
            <a>15%</a>
            <a>20%</a>
        </div>
        <h1 className='anotherSumTitle'>Своя сумма:</h1>
        <input type='number' className='SumInput'></input>
        <div className='finalSum'>
            <a>Итого</a>
            <a>210 ₽</a>
        </div>
        <MainButton goto="/pay" title="Оплатить" />
    </div>
  )
}

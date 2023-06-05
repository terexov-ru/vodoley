import React from 'react'
import './TipsCheck.css'
import mark1 from '../../media/MarkVector.png'
import mark2 from '../../media/MarkRingVector.png'
import clock0 from '../../media/ClockBlue.png'
import clock1 from '../../media/ClockGreen.png'
import clock2 from '../../media/ClockGray.png'

export const TipsCheck = (props) => {
    let Status = ""
    let clock
    if(props.comfirmation === '1') {
        Status = "Ожидается"
        clock = clock1 
    } else if(props.comfirmation === '2') {
        Status = "Завершилась"
        clock = clock2
    } else {
        Status = ""
        clock = clock0
    }
  return (
    <div className='Address'>
        <div className='location'>
            <img id='mark1' src={mark1} />
            <img id='mark2' src={mark2} />
            <span id='markspan'>{props.address}</span>
        </div>
        <div className='time'>
            <img id='clock' src={clock} />
            <span id='clockspan'>{props.times}</span>
        </div>
        {props.children}
        <div className='ServiceCheck'>
            <table>
                <tbody>
                    <tr>
                        <td>{props.title}</td>
                        <td>{props.sum}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Сумма</td>
                        <td>1400 ₽</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
  )
}

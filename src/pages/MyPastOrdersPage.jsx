import React from 'react'
import { Header } from '../components/Header/Header';
import {NavLink} from 'react-router-dom'
import '../pageStyles/MyOrdersPage.css'

export const MyPastOrdersPage = () => {
    return (
        <div>
            <Header title="Мои записи"/>
            <div className='mover'>
                <NavLink id='mover' to='/myorders'>Текущие 12</NavLink>
                <NavLink id='mover' to='/myorder/past'>Прошедше 12</NavLink>
            </div>
        </div>
    )
}

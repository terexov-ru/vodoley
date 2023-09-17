import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import "./mainButton.css"

export const MainButton = (props) => {
    const location = useLocation();
    const isChangeOrderPage = location.pathname.startsWith('/changeorder/'); // Проверяем, начинается ли путь с '/changeorderpage/'

    const buttonClassName = isChangeOrderPage ? 'mainButton_ChangeOrder' : 'mainButton';
    return (
        <div className={buttonClassName} onClick={props.onClick}>
            <NavLink to={props.goto}>
                {props.title}
            </NavLink>
        </div>
    )
}

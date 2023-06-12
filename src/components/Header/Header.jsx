import './header.css';
import back from '../../media/back.png'
import {NavLink} from 'react-router-dom'

export const Header = (props) => {
  return (
    <div className='header'>
        <NavLink to={props.gobackto}>
          <img className='headerImg' src={back} alt="back" />
          </NavLink>
        <h1 className='headerTitle'>{props.title}</h1>
    </div>
    
  )
}
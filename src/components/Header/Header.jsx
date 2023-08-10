import './header.css';
import back from '../../media/back.png'

export const Header = (props) => {
    const goBack = () => {
        window.history.back();
    };
    return (
        <div className='header'>
            <button className="headerButton" onClick={goBack}>
                <img className='headerImg' src={back} alt="back" />
            </button>
            <h1 className='headerTitle'>{props.title}</h1>
        </div>

    )
}
import React, {useEffect, useState} from 'react'
import '../pageStyles/ProfilePage.css'
import { Header } from '../components/Header/Header';
import { NavLink } from 'react-router-dom';
import axios from '../utils/axios'
import { QueryClient, useMutation, useQuery } from 'react-query';
import queryString from "query-string";


async function updateUser(data) {
    await axios.post('edit-user/', data)
}


export const ProfilePage = () => {
    const queryClient = new QueryClient
    const[userData, setUserData] = useState(null)
    const[userName, setUserName] = useState('');
    const[userNumber, setUserNumber] = useState('')
    const[mark, setMark] = useState('')
    const[model, setModel] = useState('')
    const[userTG, setUserTG] = useState('');
    const[carNumber, setCarNumber] = useState('');
    const[isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get('edit-user/').then(response => {
            setUserData(response.data);
            setUserName(response.data.userName);
            setUserNumber(response.data.userNumber);
            setMark(response.data.mark);
            setModel(response.data.model); // Remove the comma from the model
            setCarNumber(response.data.carNumber);
            setUserTG(response.data.userTG);
            setCompleted(response.data.completed);
            setIsLoading(false);
        });
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        const updatedData = {
            userName,
            userNumber,
            model,
            mark,
            carNumber,
            userTG,
        };
        updateUser(updatedData);
    };



    return (
        <div className='ProfilePage'>
            <Header title="Профиль" gobackto="/"/>
            {userData && (
                <div className='ProfileUserData'>
                    <h1 className='DataTitle'>Личные данные</h1>
                    <div id='PersonNameInfo'
                         className={isEditing ? 'hiddenProfileBlock' : 'activeProfileBlock'}>
                        <p className='PersonNameInfoTitle'>имя</p>
                        <p className='PersonNameInfoData'>{userName}</p>
                    </div>

                    <form id='EditPersonNameInfo'
                          className={isEditing ? 'activeProfileBlock' : 'hiddenProfileBlock'}>
                        <p className='EditPersonNameInfoTitle'>Имя</p>
                        <input
                            type='text'
                            className='EditPersonNameInfoData'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder={userName}
                        />
                    </form>

                    <div id='PersonNumberInfo'
                         className={isEditing ? 'hiddenProfileBlock' : 'activeProfileBlock'}>
                        <p className='PersonNumberInfoTitle'>мобильный</p>
                        <p className='PersonNumberInfoData'>{userNumber}</p>
                    </div>

                    <form id='EditPersonNumberInfo'
                          className={isEditing ? 'activeProfileBlock' : 'hiddenProfileBlock'}>
                        <p className='EditPersonNumberInfoTitle'>Мобильный</p>
                        <input
                            type='text'
                            className='EditPersonNumberInfoData'
                            value={userNumber}
                            onChange={(e) => setUserNumber(e.target.value)}
                            placeholder={userNumber} />
                    </form>

                    <div className='PersonTG'>
                        <p className='PersonTGInfoTitle'>имя Telegram</p>
                        <p className='PersonTGInfoData'>{userTG}</p>
                    </div>

                </div>
            )}

            <div className='ProfileCarData'>
                <h1 className='DataTitle'>Данные автомобиля</h1>

                <div id='CarInfo'
                     className={isEditing ? 'hiddenProfileBlock' : 'activeProfileBlock'}>
                    <p id='CarInfoTitle'>Марка</p>
                    <p id='CarInfoData'>{mark}</p>
                </div>


                <form id='EditCarInfo'
                      className={isEditing ? 'activeProfileBlock' : 'hiddenProfileBlock'}>
                    <p className='EditCarInfoTitle'>Марка</p>
                    <input
                        type='text'
                        className='EditCarInfoData'
                        value={mark}
                        onChange={(e) => setMark(e.target.value)}
                        placeholder={mark} />
                </form>

                <div id='CarInfo'
                     className={isEditing ? 'hiddenProfileBlock' : 'activeProfileBlock'}>
                    <p id='CarInfoTitle'>Модель</p>
                    <p id='CarInfoData'>{model}</p>
                </div>


                <form id='EditCarInfo'
                      className={isEditing ? 'activeProfileBlock' : 'hiddenProfileBlock'}>
                    <p className='EditCarInfoTitle'>Модель</p>
                    <input
                        type='text'
                        className='EditCarInfoData'
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder={model} />
                </form>

                <div id='CarInfo'
                     className={isEditing ? 'hiddenProfileBlock' : 'activeProfileBlock'}>
                    <p id='CarInfoTitle'>номер</p>
                    <p id='CarInfoData'>{carNumber}</p>
                </div>

                <form id='EditCarInfo'
                      className={isEditing ? 'activeProfileBlock' : 'hiddenProfileBlock'}>
                    <p className='EditCarInfoTitle'>номер</p>
                    <input
                        type='text'
                        className='EditCarInfoData'
                        value={carNumber}
                        onChange={(e) => setCarNumber(e.target.value)}
                        placeholder={carNumber} />
                </form>

                <div id='CarConfirm' className='activeProfileBlock'>
                    {completed ? "Регистрация подтверждена" : "Регистрация не подтверждена"}
                </div>
            </div>

            <button
                id="DataChangeInfo"
                className={
                    isEditing ? 'hiddenProfileBlock' : 'activeProfileBlock'
                }
                onClick={handleEditClick}
            >
                Изменить
            </button>
            <NavLink to='/'>
                <button
                    id="SaveDataChangeInfo"
                    className={
                        isEditing ? 'activeProfileBlock' : 'hiddenProfileBlock'
                    }
                    onClick={handleSaveClick}
                >
                    Сохранить
                </button>
            </NavLink>
        </div>
    )
}
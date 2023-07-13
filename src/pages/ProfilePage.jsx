import React, { useState } from 'react'
import '../pageStyles/ProfilePage.css'
import { Header } from '../components/Header/Header';
import { NavLink } from 'react-router-dom';
import axios from '../utils/axios'
import { QueryClient, useMutation, useQuery } from 'react-query';


async function getUser() {
  const {data} = await axios.get('edit-user/')
  return data
}

async function updateUser(data) {
  await axios.post(`edit-user/`, data)
}

export const ProfilePage = () => {
  const queryClient = new QueryClient
  const{data, isLoading, isError} = useQuery('profile', getUser)

  //изменение переметров
  const[userName, setUserName] = useState(data.userName)
  const[userNumber, setUserNumber] = useState(data.userNumber)
  const[carNumber, setCarNumber] = useState(data.carNumber)
  const[userCar, setUserCar] = useState(data.userCar)

  const updateData = useMutation(newData => updateUser(newData), {
    onSuccess: () => queryClient.invalideteQueries(['profile'])
  })


  if(isLoading) {
    return <h1>Идет загрузка...</h1>
  }

  if(isError) {
    return <h1>error</h1>
  }

  if(!data) {
    return <h1>no data</h1>
  }


  const editProfileHandler = async () => {
    let confirm = document.getElementById('CarConfirm')
    let profileBlocks = document.querySelectorAll('[id$="\\Info"]')
    for (let j = 0; j < profileBlocks.length; j=j+2) {
      if(profileBlocks[j].classList.contains('activeProfileBlock')){
        profileBlocks[j].classList.remove("activeProfileBlock")
        profileBlocks[j].classList.add("hiddenProfileBlock")
        profileBlocks[j+1].classList.remove("hiddenProfileBlock")
        profileBlocks[j+1].classList.add("activeProfileBlock")
      }
    }
    if(confirm.classList.contains('activeProfileBlock')){
      confirm.classList.remove("activeProfileBlock")
      confirm.classList.add("hiddenProfileBlock")
    }
  }

  const saveEditProfileHandler = async () => {
    let confirm = document.getElementById('CarConfirm')
    let profileBlocks = document.querySelectorAll('[id$="\\Info"]')
    for (let j = 0; j < profileBlocks.length; j=j+2) {
      if(profileBlocks[j].classList.contains('hiddenProfileBlock')) {
        profileBlocks[j].classList.remove("hiddenProfileBlock")
        profileBlocks[j].classList.add("activeProfileBlock")
        profileBlocks[j+1].classList.remove("activeProfileBlock")
        profileBlocks[j+1].classList.add("hiddenProfileBlock")
      }
    }
    if(confirm.classList.contains('hiddenProfileBlock')) {
      confirm.classList.remove("hiddenProfileBlock")
      confirm.classList.add("activeProfileBlock")
    }

    //создание нового объекта данных юзера
    let updatedPersonData = personData
    updatedPersonData.userName = userName
    updatedPersonData.userNumber = userNumber
    updatedPersonData.userCar = userCar
    updatedPersonData.carNumber = carNumber
    updateData.mutate(updatedPersonData)
  }


  return (
    <div className='ProfilePage'>
        <Header title="Профиль" gobackto="/"/>
        <div className='ProfileUserData'>
          <h1 className='DataTitle'>Личные данные</h1>
          <div id='PersonNameInfo' className='activeProfileBlock'>
            <p className='PersonNameInfoTitle'>имя</p>
            <p className='PersonNameInfoData'>{data.userName}</p>
          </div>

          <form id='EditPersonNameInfo' className='hiddenProfileBlock'>
            <p className='EditPersonNameInfoTitle'>Имя</p>
            <input 
              type='text' 
              className='EditPersonNameInfoData' 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              placeholder={data.userName} 
            />
          </form>

          <div id='PersonNumberInfo' className='activeProfileBlock'>
            <p className='PersonNumberInfoTitle'>мобильный</p>
            <p className='PersonNumberInfoData'>{data.userNumber}</p>
          </div>

          <form id='EditPersonNumberInfo' className='hiddenProfileBlock'>
            <p className='EditPersonNumberInfoTitle'>Мобильный</p>
            <input 
              type='text' 
              className='EditPersonNumberInfoData' 
              value={userNumber} 
              onChange={(e) => setUserNumber(e.target.value)} 
              placeholder={data.userNumber} />
          </form>

          <div className='PersonTG'>
            <p className='PersonTGInfoTitle'>имя Telegram</p>
            <p className='PersonTGInfoData'>{data.userTG}</p>
          </div>

        </div>

        <div className='ProfileCarData'>
          <h1 className='DataTitle'>Данные автомобиля</h1>
          
          <div id='CarInfo' className='activeProfileBlock'>
            <p id='CarInfoTitle'>марка и модель</p>
            <p id='CarInfoData'>{data.userCar}</p>
          </div>

          <form id='EditCarInfo' className='hiddenProfileBlock'>
            <p className='EditCarInfoTitle'>марка и модель</p>
            <input 
              type='text' 
              className='EditCarInfoData' 
              value={userCar} 
              onChange={(e) => setUserCar(e.target.value)} 
              placeholder={data.userCar} />
          </form>

          <div id='CarInfo' className='activeProfileBlock'>
            <p id='CarInfoTitle'>номер</p>
            <p id='CarInfoData'>{data.carNumber}</p>
          </div>

          <form id='EditCarInfo' className='hiddenProfileBlock'>
            <p className='EditCarInfoTitle'>номер</p>
            <input 
              type='text' 
              className='EditCarInfoData' 
              value={carNumber} 
              onChange={(e) => setCarNumber(e.target.value)} 
              placeholder={data.carNumber} />
          </form>

          <div id='CarConfirm' className='activeProfileBlock'>Регистрация подтверждена</div> 
        </div>
        
        <button id='DataChangeInfo' className='activeProfileBlock' onClick={editProfileHandler}>Изменить</button>
        <NavLink to='/'>
          <button id='SaveDataChangeInfo' className='hiddenProfileBlock' onClick={saveEditProfileHandler}>Сохранить</button>
        </NavLink>
    </div>
  )
}

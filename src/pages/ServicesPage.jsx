import React, { useState } from 'react'
import '../pageStyles/ServicesPage.css'
import { Header } from '../components/Header/Header';
import { Service } from '../components/Services/Service';
import CloseCross from '../media/ServiceCloseCross.png'
import { MainButton } from '../components/mainButton/MainButton';
import axios from '../utils/axios'
import { useQuery } from 'react-query';

async function getAllServices(id) {
  const{data} = await axios.get(`get-services-for-address/${id}`)
  return data
}

export const ServicesPage = () => {
  const[id, setId] = useState(0)  
  const {data, isLoading, isError} = useQuery(['services', id], () => 
    getAllServices(id)
  )

  if(isLoading) {
    return <h1>Идет загрузка...</h1>
  }

  if(isError) {
    return <h1>error</h1>
  }

  if(!data) {
    return <h1>no data</h1>
  }

  //скрыть подсказку
  const closeHelp = () => {
    let el = document.getElementById('ServiceHelp')
    el.style.display = (el.style.display === 'none') ? 'block' : 'none'
  }

  //переключение разделов
  const handleClick = (e) => {
    let foo = document.querySelectorAll("a");
    for (let i = 0; i < foo.length; i++) {
      foo[i].classList.remove("active");
    }
    e.currentTarget.classList.add("active");

    let lists = document.querySelectorAll('[id$="\\ServiceList"]')
    console.log(lists)
    for (let j = 0; j < lists.length; j++) {
      if(lists[j].classList.contains('activeServiceList')){
        lists[j].classList.remove("activeServiceList")
        lists[j].classList.add("hiddenServiceList")
        lists[j+1].classList.remove("hiddenServiceList")
        lists[j+1].classList.add("activeServiceList")
        break
      } else if(lists[j].classList.contains('hiddenServiceList')) {
        lists[j].classList.remove("hiddenServiceList")
        lists[j].classList.add("activeServiceList")
        lists[j+1].classList.remove("activeServiceList")
        lists[j+1].classList.add("hiddenServiceList")
        break
      }
    }
  };

  return (
    <div className='ServicesPage'>
        <Header title="Услуги" gobackto="/"/>
        <div className='ServiceButtonSet'>
           <a className='active' onClick={handleClick}>Основные {data.length}</a>
           <a className='' onClick={handleClick}>Специальные {data.length}</a>
        </div>
        <div id='ServiceHelp' style={{display: 'block',}}>
          <div className='ServiceHelp' >
            <p>Выберете интересующие вас услуги.</p>
            <button className='ServiceCloseCross' onClick={closeHelp}>
              <img src={CloseCross} />
            </button>
          </div>
        </div>

        <div id='baseServiceList' className='activeServiceList'>
            {data.forEach((service, ind) => (
                <Service service={service} key={ind} />
            ))}
        </div>


        <div id='specialServiceList' className='hiddenServiceList'>
            {data.forEach((service, ind) => (
            <Service service={service} key={ind} />
            ))}
        </div>


        <div className='hiddenButton'>
          <MainButton title='Записаться' goto='/makeorder' />
        </div>
    </div>
  )
}

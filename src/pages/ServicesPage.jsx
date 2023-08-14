import React, {useEffect, useState} from 'react'
import '../pageStyles/ServicesPage.css'
import { Header } from '../components/Header/Header';
import { Service } from '../components/Services/Service';
import CloseCross from '../media/ServiceCloseCross.png'
import { MainButton } from '../components/mainButton/MainButton';
import axios from '../utils/axios'
import { useQuery } from 'react-query';

async function getAllServices(id) {
    //const{data} = await axios.get(`get-services-for-address/${id}`)
    const{data} = await axios.get(`get-services-for-address/`)
    //const{data} = await axios.get(`services/`)
    return data
}

export const ServicesPage = ({showHeader, showButton}) => {
    const[id, setId] = useState(0);
    const [activeTab, setActiveTab] = useState('base');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const tabLists = document.querySelectorAll('[id$="ServiceList"]');

        tabLists.forEach(list => {
            if (list.id === `${tab}ServiceList`) {
                list.classList.add("activeServiceList");
                list.classList.remove("hiddenServiceList");
            } else {
                list.classList.remove("activeServiceList");
                list.classList.add("hiddenServiceList");
            }
        });
    };
    const [selectedServices, setSelectedServices] = useState(() => {
        const storedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];
        return storedServices;
    });
    const {data, isLoading, isError} = useQuery(['services', id], () =>
        getAllServices(id)
    )
    useEffect(() => {
        localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    }, [selectedServices]);

    if(isLoading) {
        return <h1>Идет загрузка...</h1>
    }

    if(isError) {
        return <h1>error</h1>
    }

    if(!data) {
        return <h1>no data</h1>
    }

    console.log(data)

    const mainServices = data.services.services.filter(service => service.type === 'base');
    const specialServices = data.services.services.filter(service => service.type === 'special');

    //скрыть подсказку
    const closeHelp = () => {
        let el = document.getElementById('ServiceHelp')
        el.style.display = (el.style.display === 'none') ? 'block' : 'none'
    }

    //переключение разделов

    const handleServiceChange = (updatedServices) => {
        console.log('Updated services in ServicesPage:', updatedServices);
        setSelectedServices(updatedServices); // Обновите tempSelectedServices
    };



    return (
        <div className='ServicesPage'>
            {showHeader && <Header title="Услуги" gobackto="/"/>}
            <div className='ServiceButtonSet'>
                <a
                    className={activeTab === 'base' ? 'active' : ''}
                    onClick={() => handleTabClick('base')}
                >
                    Основные {data.length}
                </a>
                <a
                    className={activeTab === 'special' ? 'active' : ''}
                    onClick={() => handleTabClick('special')}
                >
                    Специальные {data.length}
                </a>
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
                {mainServices.map((service, ind) => (
                    <Service service={service}
                             selectedServices={selectedServices}
                             setSelectedServices={setSelectedServices}
                             key={ind}
                    />
                ))}
            </div>


            <div id='specialServiceList' className='hiddenServiceList'>
                {specialServices.map((service, ind) => (
                    <Service service={service}
                             selectedServices={selectedServices}
                             setSelectedServices={setSelectedServices}
                             key={ind}
                    />
                ))}
            </div>
            {showButton &&
                <div className='hiddenButton'>
                    <MainButton title='Записаться' goto='/makeorder' />
                </div>
            }

        </div>
    )
}

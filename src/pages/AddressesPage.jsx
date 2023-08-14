import React, {useState} from 'react'
import '../pageStyles/AddressesPage.css'
import { Header } from '../components/Header/Header';
import { Address } from '../components/Address/Address';
//import zoom from '../media/Screen_Shrink_Arrow.png'
//import globalMap from '../media/Frame18.png'
import SimpleMap from '../components/map'
import axios from '../utils/axios'
import {useQuery} from 'react-query'

async function getAllAddresses() {
    //const {data} = await axios.get('addresses/')
    const {data} = await axios.get('get-addresses-list/')
    return data
}

export const AddressesPage = () => {
    const {data, isLoading, isError} = useQuery('addresses', getAllAddresses)
    const [selectedAddress, setSelectedAddress] = useState(null);

    if(isLoading) {
        return <h1>Идет загрузка...</h1>
    }

    if(isError) {
        return <h1>error</h1>
    }

    if(!data) {
        return <h1>Нет доступных адрессов</h1>
    }

    const handleShowOnMap = (address) => {
        setSelectedAddress(address);
    };

    return (
        <div className='AddressPage'>
            <Header title="Адреса моек" gobackto="/"/>
            <SimpleMap addresses={data} selectedAddress={selectedAddress} onShowOnMap={handleShowOnMap} /> {/* Измените эту строку */}
            <div className='list'>
                <h1 className='addressTitle'>Список</h1>
                {data.map((address) => (
                    <Address
                        key={address.id}
                        addresses={address}
                        selectedAddress={selectedAddress}
                        onShowOnMap={() => handleShowOnMap(address)}
                    />
                ))}
            </div>
        </div>
    )
}


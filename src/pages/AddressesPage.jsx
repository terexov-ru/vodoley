import React, {useState} from 'react'
import '../pageStyles/AddressesPage.css'
import { Header } from '../components/Header/Header';
import { Address } from '../components/Address/Address';
import SimpleMap from '../components/map'
import axios from '../utils/axios'
import {useQuery} from 'react-query'
import {NoContent} from "../components/NoContent/NoContent";

async function getAllAddresses() {
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
        return (
            <div className='AddressPage2'>
                <Header title="Адреса моек" gobackto="/"/>
                <div className='centeredNoContent'>
                    <NoContent/>
                </div>
            </div>
        )
    }

    if(!data) {
        return (
            <div className='AddressPage'>
                <Header title="Адреса моек" gobackto="/"/>
                <div className='centeredNoContent'>
                    <NoContent/>
                </div>
            </div>
        )

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

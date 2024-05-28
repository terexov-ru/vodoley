import {HashRouter, Routes, Route, useNavigate} from 'react-router-dom';
import { useMutation} from "react-query";
import axios from "./utils/axios";
import { AddressesPage } from './pages/AddressesPage';
import { AuthPage } from './pages/AuthPage';
import { DiscountInfoPage } from './pages/DiscountInfoPage';
import { DiscountPage } from './pages/DiscountPage';
import { LoginPage } from './pages/LoginPage';
import { LoginVerificationPage } from './pages/LoginVerificationPage';
import { MainPage } from './pages/MainPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { OrderPage } from './pages/OrderPage';
import { PaymentPage } from './pages/PaymentPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { ServicesPage } from './pages/ServicesPage';
import { TipsPage } from './pages/TipsPage';
import Redirect from "./pages/Redirect";
import {ChangeOrderPage} from "./pages/ChangeOrderPage";
import {ReviewsPage} from "./pages/ReviewsPage";

import "./App.css"


function App() {
  const LoginUserName = async (code) => {
    const navigate = useNavigate()
    try {
      const { data } = await axios.post('auth-login/', code)
      // если в запросе есть токен то записывает его в сторадж
      if(data.token) {
        const token = data.token
        window.localStorage.setItem('VodoleyToken', token)
        const mytoken = window.localStorage.getItem('VodoleyToken')
        if(mytoken !== null) {
          navigate('/');
        }
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const user = useMutation(user => LoginUserName(user), {
    onSuccess: () => console.log('loged in')
  })

  const handleSubmit = data => {
    user.mutate(data)
  };


  return (
      <HashRouter>
        <main>
          <Routes>
            {/*<Route path='/' element={<Redirect/>}/> */}
            <Route path='/main' element={<MainPage />} /> {/* Главная  страница */}
            <Route path='/address' element={<AddressesPage />} /> {/* Список адресов */}
            <Route path='/services' element={<ServicesPage showAddress={true} showButton={true} showHeader={true} />} /> {/* Услуги */}
            <Route path='/discounts' element={<DiscountPage />} /> {/* Список скидок */}
            <Route path='/' element={<AuthPage />} /> {/* Страница перехода на логин или регистрацию */}
            <Route path='/info' element={<DiscountInfoPage />} /> {/* Программа скидок */}
            <Route path='/login' element={<LoginPage />} /> {/* Страница логининга */}
            <Route path='/login/verify' element={<LoginVerificationPage length={4} onSubmit={handleSubmit} />}/> {/* Код авторизации */}
            <Route path='/register' element={<RegisterPage />} /> {/* Страница регистрации */}
            <Route path='/pay' element={<PaymentPage />} /> {/* Страница оплаты */}
            <Route path='/profile' element={<ProfilePage />} /> {/* Профиль */}
            <Route path='/tips/:orderId' element={<TipsPage />} /> {/*  */}
            <Route path='/myorders' element={<MyOrdersPage />} /> {/* Мои записи  */}
            <Route path='/makeorder' element={<OrderPage />} /> {/* Записаться  */}
            <Route path='/changeorder/:id' element={<ChangeOrderPage />} /> {/* Изменить заказ */}
            <Route path='/review/:id' element={<ReviewsPage />} /> {/* Отзывы */}
          </Routes>
        </main>
      </HashRouter>
  );
}

export default App;

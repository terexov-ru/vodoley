import { HashRouter, Routes, Route } from 'react-router-dom';
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
import axios from "./utils/axios";
import { useMutation} from "react-query";



function App() {

  const loginUserName = async (code) => {
    try {
      const { data } = await axios.post('auth-login/', {code})
      // если в запросе есть токен то записывает его в сторадж
      if(data.token) {
        window.localStorage.setItem('token', data.token)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const user = useMutation(user => loginUserName(user), {
    onSuccess: () => console.log('loged in')
  })

  const handleSubmit = data => {
    // Здесь вы можете выполнить отправку данных, используя значение `data`
    user.mutate(data)
    console.log('Отправка данных:', data);
  };
  return (
      <HashRouter>
        <main>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/main' element={<MainPage />} /> {/* Главная  страница */}
            <Route path='/address' element={<AddressesPage />} /> {/* Список адресов */}
            <Route path='/services' element={<ServicesPage showButton={true} showHeader={true} />} /> {/* Услуги */}
            <Route path='/discounts' element={<DiscountPage />} /> {/* Список скидок */}
            <Route path='/auth' element={<AuthPage />} /> {/* Страница перехода на логин или регистрацию */}
            <Route path='/info' element={<DiscountInfoPage />} /> {/* Программа скидок */}
            <Route path='/login' element={<LoginPage />} /> {/* Страница логининга */}
            <Route path='/login/verify' element={<LoginVerificationPage length={4} onSubmit={handleSubmit} />}/> {/* Код авторизации */}
            <Route path='/register' element={<RegisterPage />} /> {/* Страница регистрации */}
            <Route path='/pay' element={<PaymentPage />} /> {/* Страница оплаты */}
            <Route path='/profile' element={<ProfilePage />} /> {/* Профиль */}
            <Route path='/tips' element={<TipsPage />} /> {/*  */}
            <Route path='/myorders' element={<MyOrdersPage />} /> {/* Мои записи  */}
            <Route path='/makeorder' element={<OrderPage />} /> {/* Записаться  */}
          </Routes>
        </main>
      </HashRouter>
  );
}

export default App;

import { HashRouter, Routes, Route } from 'react-router-dom';
import { DiscountInfoPage } from './pages/DiscountInfoPage';
import { AuthPage } from './pages/AuthPage';
import { LoginPage } from './pages/LoginPage';
import { LoginVerificationPage } from './pages/LoginVerificationPage';
import { RegisterPage } from './pages/RegisterPage';
import { PaymentPage } from './pages/PaymentPage';
import { ProfilePage } from './pages/ProfilePage';
import { AddressesPage } from './pages/AddressesPage';
import { ServicesPage } from './pages/ServicesPage';
import { DiscountPage } from './pages/DiscountPage';
import { TipsPage } from './pages/TipsPage';
import { MainPage } from './pages/MainPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { MyPastOrdersPage } from './pages/MyPastOrdersPage';


function App() {
  return (
    <HashRouter>
      <main>
        <Routes>
          <Route path='/' element={<MainPage />} /> {/* Главная  страница */}
          <Route path='/address' element={<AddressesPage />} /> {/* Список адресов */}
          <Route path='/services' element={<ServicesPage />} /> {/* Услуги */}
          <Route path='/discounts' element={<DiscountPage />} /> {/* Список скидок */}
          <Route path='/auth' element={<AuthPage />} /> {/* Страница перехода на логин или регистрацию */}
          <Route path='/info' element={<DiscountInfoPage />} /> {/* Программа скидок */}
          <Route path='/login' element={<LoginPage />} /> {/* Страница логининга */}
          <Route path='/login/verify' element={<LoginVerificationPage />} /> {/* Код авторизации */}
          <Route path='/register' element={<RegisterPage />} /> {/* Страница регистрации */}
          <Route path='/pay' element={<PaymentPage />} /> {/* Страница оплаты */}
          
          <Route path='/profile' element={<ProfilePage />} /> {/* Профиль */}
          <Route path='/tips' element={<TipsPage />} /> {/*  */}
          <Route path='/myorders' element={<MyOrdersPage />} /> {/* Мои записи  */}
          <Route path='/myorder/past' element={<MyPastOrdersPage />} /> {/* завершенные записи */}
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;

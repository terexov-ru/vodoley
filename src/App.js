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
          <Route path='/info' element={<DiscountInfoPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/login/verify' element={<LoginVerificationPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/pay' element={<PaymentPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/address' element={<AddressesPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/discounts' element={<DiscountPage />} />
          <Route path='/tips' element={<TipsPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/myorders' element={<MyOrdersPage />} />
          <Route path='/myorder/past' element={<MyPastOrdersPage />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;

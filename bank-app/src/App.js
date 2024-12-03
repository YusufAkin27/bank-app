import React from 'react';
import { Routes, Route } from 'react-router-dom'; // BrowserRouter import edilmedi çünkü index.js'de kullanılıyor
import { ChakraProvider } from '@chakra-ui/react'; // Chakra UI Provider
import { AuthProvider } from './context/AuthContext'; // AuthProvider import edilmesi gereken doğru yol
import LoginForm from './pages/LoginPage'; // LoginForm import edilmesi gereken doğru yol
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ActivatePage from './pages/VerifyCode';
import VerifyLoginCode from './pages/VerifyLoginCode';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import TermsPage from './pages/TermsPage';
import CreateAddress from './pages/CreateAddress ';
import CreateDebitCard from './pages/CreateDebitCard';

const App = () => {
  return (
    <ChakraProvider> {/* Chakra UI stili sağlayan ChakraProvider */}
      <AuthProvider> {/* AuthContext sağlayıcı bileşeni */}
        <Routes> {/* React Router Routes bileşeni */}
          <Route path="/" element={<LoginForm />} /> {/* LoginForm sayfasına yönlendirme */}
          <Route path="/register" element={<RegisterPage />} /> {/* LoginForm sayfasına yönlendirme */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* LoginForm sayfasına yönlendirme */}
          <Route path="/reset-password/*" element={<ResetPassword />} /> {/* LoginForm sayfasına yönlendirme */}
          <Route path="/home" element={<HomePage />} /> {/* LoginForm sayfasına yönlendirme */}
          <Route path="/verifyCode" element={<ActivatePage />} /> {/* LoginForm sayfasına yönlendirme */}
          <Route path="/verifyLoginCode" element={<VerifyLoginCode />} /> {/* LoginForm sayfasına yönlendirme */}

          <Route path="/profile" element={<Profile />} /> {/* LoginForm sayfasına yönlendirme */}
          <Route path="/profile-edit" element={<ProfileEdit />} /> {/* LoginForm sayfasına yönlendirme */}
          <Route path="/termsPage" element={<TermsPage />} /> {/* LoginForm sayfasına yönlendirme */}
          <Route path="/createAddress" element={<CreateAddress />} /> {/* LoginForm sayfasına yönlendirme */}
          <Route path="/createDebitCard" element={<CreateDebitCard />} /> {/* LoginForm sayfasına yönlendirme */}


         

        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;

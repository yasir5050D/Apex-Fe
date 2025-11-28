import { Route, Routes } from 'react-router-dom';
import PaymentResult from './src/pages/PaymentResult';
import Home from './src/pages/Home';
import Register from './src/pages/Registeration';
import RegistrationConfirmation from './src/pages/RegistrationConfirmation';
import Franchise from './src/pages/Franchise';
import FranchiseRegisterPage from './src/pages/FranchiseRegisterPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment" element={<PaymentResult />} />
      <Route path="/franchise" element={<Franchise />} />
      <Route path="/franchise/register" element={<FranchiseRegisterPage />} />
       <Route path="/register/confirmation" element={<RegistrationConfirmation />} />
    </Routes>
  )
}
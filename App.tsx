import { Route, Routes } from 'react-router-dom';
import PaymentResult from './src/pages/PaymentResult';
import Home from './src/pages/Home';
import Register from './src/pages/Registeration';
import RegistrationConfirmation from './src/pages/RegistrationConfirmation';
import FranchiseRegisterForm from './src/pages/FranchiseRegisterForm';
import Franchise from './src/pages/Franchise';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment" element={<PaymentResult />} />
      <Route path="/franchise" element={<Franchise />} />
      <Route path="/franchise/register" element={<FranchiseRegisterForm />} />
       <Route path="/register/confirmation" element={<RegistrationConfirmation />} />
    </Routes>
  )
}
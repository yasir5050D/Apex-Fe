import { Route, Routes } from 'react-router-dom';
import PaymentResult from './src/pages/PaymentResult';
import Home from './src/pages/Home';
import Register from './src/pages/Registeration';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment" element={<PaymentResult />} />
    </Routes>
  )
}
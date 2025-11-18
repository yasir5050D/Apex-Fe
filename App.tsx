import { Route, Routes } from 'react-router-dom';
import Home from './src/pages/home';
import Register from './src/pages/registeration';
import PaymentResult from './src/pages/PaymentResult';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment" element={<PaymentResult />} />
    </Routes>
  )
}
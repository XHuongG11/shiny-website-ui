import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginRegister from './features/LoginSignin';
import MakeOrder from './features/MakeOrder';
import CompleteOrder from './features/CompleteOrder';
import Home from './features/Home/Home';
import InfoCustomer from './features/InfoCustomer/InfoCus';
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import AllProduct from './features/AllProduct/AllProduct';
import ProductDetail from './features/ProductDetail/ProductDetail';
import Cart from './features/Cart/Cart';
function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/checkouts/*' element={<MakeOrder />}></Route>
        <Route path='/login' element={<LoginRegister />}></Route>
        <Route path='/checkouts/thank-you' element={<CompleteOrder />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/allproduct' element={<AllProduct />}></Route>
        <Route path='/infocus' element={<InfoCustomer />}></Route>
        <Route path='/productdetail' element={<ProductDetail />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>

      <Footer />
    </div >
  )
}

export default App

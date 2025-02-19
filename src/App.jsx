import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginRegister from './features/LoginSignin';
import MakeOrder from './features/MakeOrder';
import CompleteOrder from './features/CompleteOrder';
import Home from './features/Home/Home';
import InfoCustomer from './features/InfoCustomer/InfoCus';
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/checkouts/*' element={<MakeOrder />}></Route>
        <Route path='/login' element={<LoginRegister />}></Route>
        <Route path='/checkouts/thank-you' element={<CompleteOrder />}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/infocus' element={<InfoCustomer/>}></Route>
      </Routes>

      <Footer/>
    </div >
  )
}

export default App

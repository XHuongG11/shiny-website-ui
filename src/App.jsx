import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginRegister from './features/LoginSignin';
import MakeOrder from './features/MakeOrder';
import CompleteOrder from './features/CompleteOrder';
import Header from "./components/Header/header";
function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/checkouts/*' element={<MakeOrder />}></Route>
        <Route path='/login' element={<LoginRegister />}></Route>
        <Route path='/checkouts/thank-you' element={<CompleteOrder />}></Route>
      </Routes>

      {/* Footer */}
    </div >
  )
}

export default App

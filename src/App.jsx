import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginRegister from "./features/LoginSignin";
import MakeOrder from "./features/MakeOrder";
import CompleteOrder from "./features/CompleteOrder";
import Home from "./features/Home/Home";
import InfoCustomer from "./features/InfoCustomer/InfoCus";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import AllProduct from "./features/AllProduct/AllProduct";
import ProductDetail from "./features/ProductDetail/ProductDetail";
import Cart from "./features/Cart/Cart";
import HandleError from "./utils/HandleError";
import ReviewProduct from "./features/Review/ReviewProduct";
import ThankYou from "./features/Review/components/ThankyouReview";
import ReturnOrder from "./features/ReturnProduct/ReturnOrder";
import ReturnProduct from "./features/ReturnProduct/ReturnProduct";
import ThankYouReturn from "./features/ReturnProduct/components/ThankyouReturn";
import MyOrder from "./features/MyOrder/AllMyOrder/MyOrders";
import OrderDetail from "./features/MyOrder/OrderDetail/OrderDetails";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/checkouts/*" element={<MakeOrder />}></Route>
        <Route path="/myorder/" element={<MyOrder />}></Route>
        <Route path="/myorder/orderdetail" element={<OrderDetail />}></Route>
        <Route path="/login" element={<LoginRegister />}></Route>
        <Route path="/checkouts/thank-you" element={<CompleteOrder />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<AllProduct />}></Route>
        <Route path="/infocus" element={<InfoCustomer />}></Route>
        <Route path="/productdetail" element={<ProductDetail />}></Route>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/review/:id" element={<ReviewProduct />} />
        <Route path="/return/:id" element={<ReturnOrder />} />
        <Route path="/returnproduct" element={<ReturnProduct />} />
        <Route path="/thankyou-review" element={<ThankYou />} />
        <Route path="/thankyou-return" element={<ThankYouReturn />} />
        <Route path="/error/:statusCode" element={<HandleError />}></Route>
        <Route path="*" element={<Navigate to="/error/404" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

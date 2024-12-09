import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductPage from "./components/productPage";
import About from './components/About';
import Header from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Pay from './components/Pay';
import Eror from './components/Eror';
import ProductDetail from './components/ProductDetail';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import AddAdress from './components/addAdress';
import HistoryBuy from './components/Historybuy';
import ResultVnpay from './components/resultVnPay';
import ResultMomo from './components/resultMomo';
import ResetPass from './components/ResetPass';
import SendCode from './components/sendCode';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from './context/useContext';
import { useContext, useEffect } from 'react'
///route addmin 
import  NavbarAdmin from "./admin/Navbar";
import HomeAdmin from "./admin/Home";
import LoginAdmin from "./admin/Login";
import ProductAdmin from "./admin/Product";
import AddproductAdmin from "./admin/Addproduct";
import Order from './admin/OrderHistory';
import UserLayout from './components/UserLayout';
import AdminLayout from './admin/AdminLayout';
import UpdateProduct from './admin/UpdateProduct';

function App() {
  const isAuthenticated = localStorage.getItem("admin");

  // Component ProtectedRoute
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/admin/login" replace />;
  };
  const { user, login } = useContext(UserContext);
  useEffect(() => {
    const email = localStorage.getItem('email');
    const id = localStorage.getItem('id');

    if (email) {
      login(email, id);
    }
  }, []);
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UserLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-update" element={<UpdateProfile />} />
        <Route path="/address" element={<AddAdress />} />
        <Route path="/history" element={<HistoryBuy />} />  
        <Route path="/order/:detailPay" element={<ResultVnpay />} />
        <Route path="/orderMomo/:detailPay" element={<ResultMomo />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/sendCode" element={<SendCode />} />

        <Route path="*" element={<Eror />} />
        </Route>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginAdmin />} />
  
        <Route path="/admin/*" element={<ProtectedRoute element={<AdminLayout />} />}>
          <Route path="home" element={<HomeAdmin />} />
          <Route path="product" element={<ProductAdmin />} />
          <Route path="addproduct" element={<AddproductAdmin />} />
          <Route path="order" element={<Order />} />
          <Route path="update/:productId" element={<UpdateProduct />} />

        </Route>

      </Routes>
    </>
  );
  
}


export default App;

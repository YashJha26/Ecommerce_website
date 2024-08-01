import logo from './logo.svg';
import './App.css';
import Home from './pages/home'
import ProductList from './pages/ProductList';
import SingleProductPage from './pages/SingleProductPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom";
import Success from './pages/Success';
import { useSelector } from 'react-redux';

function App() {
  const user=useSelector(state=>state.user.currentUser);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/success" element={<Success />} />
      <Route 
        path="/register" 
        element={(user) ? <Navigate to="/" replace /> :  <Register />} 
      />
      <Route 
        path="/login" 
        element={(user) ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route 
        path="/cart" element={<Cart />} 
      />
      </Routes>
    </Router>
  );
}

export default App;

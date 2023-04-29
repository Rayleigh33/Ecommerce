import './App.css';
import {useEffect,useState} from "react";
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
//import Loader from './component/layout/Loader/loader';
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import  Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from './Actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from 'axios';
import Payment from "./component/Cart/Payment.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";

function App() {
  const {isAuthenticated,user} = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const {data} = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    WebFont.load({
      google: {
        families: ["Roboto","Droid Sans","Chilanka"]
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu",(e) => e.preventDefault());

  return (
    <Router>
<Header />
{isAuthenticated && <UserOptions user={user} />}
<Routes>

<Route  path="/" element={<Home />} />
<Route  path="/product/:id" element={<ProductDetails />} />
<Route  path="/products" element={<Products />} />
<Route  path="/products/:keyword" element={<Products />} />

<Route  path="/search" element={<Search />} />
<Route  path="/login" element={<LoginSignUp />} />
<Route  path="/account" element={<Profile />} />
<Route  path="/me/update" element={<UpdateProfile />} />
<Route  path="/password/update" element={<UpdatePassword />} />
<Route  path="/password/forgot" element={<ForgotPassword />} />
<Route  path="/password/reset/:token" element={<ResetPassword />} />
<Route  path="/cart" element={<Cart />} />
<Route  path="/login/shipping" element={<Shipping />} />


{stripeApiKey && (<Route path="/process/payment" element={(<Elements stripe={loadStripe(stripeApiKey)}> <Payment /></Elements>)}/>)}
<Route  path="/success" element={<OrderSuccess />} />
<Route  path="/orders" element={<MyOrders />} />


<Route  path="/order/confirm" element={<ConfirmOrder />} />
<Route  path="/order/:id" element={<OrderDetails />} />
<Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
<Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute>}/>
<Route path='/admin/product' element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>}/>
<Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>}/>
<Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>}/>
<Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><ProcessOrder/></ProtectedRoute>}/>
<Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UsersList/></ProtectedRoute>}/>
<Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>}/>
<Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><ProductReviews/></ProtectedRoute>}/>
<Route  path="/contact" element={<Contact />} />
<Route  path="/about" element={<About />} />
<Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />

   </Routes>

<Footer />
    </Router>
    
  );
}

export default App;

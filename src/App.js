import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./Componets/AuthPage/AuthPage";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Componets/Dashboard/Dashboard";
import Profile from "./Componets/Profile/Profile";
import AllRestaurants from "./Componets/AllRestaurants/AllRestaurants";
import RestaurantDetails from "./Componets/RestaurantDetails/RestaurantDetails";
import AllProducts from "./Componets/AllProducts/AllProducts";
import ProductDetail from "./Componets/ProductDetail/ProductDetail";
import CartPage from "./Componets/Cart/Cart";
import RestaurantAuthWrapper from "./Componets/RestaurantAuthWrapper/RestaurantAuthWrapper";
import RestaurantDashboard from "./Componets/RestaurantDashboard/RestaurantDashboard";
import ProductManagement from "./Componets/ProductManagement/ProductManagement";
import RestaurantLogin from "./Componets/RestaurantLogin/RestaurantLogin";
import RestaurantAuth from "./Componets/RestaurantAuth/RestaurantAuth";
import PreOrder from "./Componets/PreOrder/PreOrder";
const provider = process.env.CLIENTID;



function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/allRestaurants" element={<AllRestaurants />}></Route>
        <Route path="/restaurant/:id" element={<RestaurantDetails />}></Route>
        <Route path="/allProducts" element={<AllProducts />}></Route>
        <Route path="/product/:id" element={<ProductDetail/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
        <Route path="/preorder/:id" element={<PreOrder />} />
        <Route path="/restaurants/auth" element={<RestaurantAuth />} />
        <Route path="/restaurants/login/*" element={<RestaurantAuth />} />
        <Route path="/restaurants/signin" element={<RestaurantAuth />} />
        <Route path="/restaurants/dashboard" element={<RestaurantDashboard />} />
        <Route path="/restaurants/productManagement" element={<ProductManagement />} />
      </Routes>
    </div>
  );
}

export default App;

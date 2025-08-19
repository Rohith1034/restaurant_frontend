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
const provider = process.env.CLIENTID;


function App() {
  console.log(provider)
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
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Uhome from "./User/Uhome";
import Products from "./User/Products";
import MyOrders from "./User/MyOrders";
import OrderItem from "./User/OrderItem";
import Uitem from "./User/Uitem";
import Wishlist from "./User/Wishlist";
import Shome from "./Seller/Shome";
import Addbook from "./Seller/Addbook";
import MyProducts from "./Seller/MyProducts";
import Orders from "./Seller/Orders";
import Ahome from "./Admin/Ahome";
import Items from "./Admin/Items";
import Users from "./Admin/Users";
import Seller from "./Admin/Seller";
import Cart from "./User/Cart";
import Book from "./Seller/Book";
import Checkout from "./User/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/Ahome" element={<Ahome/>} />
        <Route path="/seller/Shome" element={<Shome/>} />
        <Route path="/user/Uhome" element={<Uhome/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Uitem />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myorder" element={<MyOrders />} />
        {/* <Route path="/cart/:orderId" element={<OrderItem />} /> */}
        <Route path="/order/:id" element={<OrderItem />} />
        <Route path="/admin/items" element={<Items />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/sellers" element={<Seller />} />
        <Route path="/seller/add-book" element={<Addbook />} />
        <Route path="/seller/products" element={<MyProducts />} />
        <Route path="/seller/orders" element={<Orders />} />
        <Route path="/seller/products" element={<MyProducts />} />
        <Route path="/checkout/:bookId" element={<Checkout />} />

        {/* <Route path="/checkout/:bookId" element={<Checkout />} /> */}
        {/* <Route path="/" element={<Uhome />} />
        <Route path="/products" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<MyOrders />} />
        <Route path="/cart/:orderId" element={<OrderItem />} />
        <Route path="/products/:id" element={<Uitem />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

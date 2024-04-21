import React, { useState } from "react";
import { AuthProvider } from "./auth/userContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Category from "./pages/category/Category";
import CategoryFrom from "./pages/category/CategoryFrom";
import axios from "axios";
import Brand from "./pages/brand/Brand";
import BrandFrom from "./pages/brand/BrandFrom";
import Product from "./pages/product/Product";
import ProductForm from "./pages/product/ProductForm";
import ViewUplodaImage from "./pages/product/ViewUplodaImage";
import CustomerDetail from "./pages/customer/CustomerDetail";
import Order from "./pages/order/Order";
import BillDetails from "./pages/order/BillDetails";
import ProductDetails from "./pages/order/ProductDetails";
import AgentFrom from "./pages/agent/AgentFrom";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <>
      <AuthProvider>
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/categoryForm" element={<CategoryFrom />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/brandForm" element={<BrandFrom />} />
            <Route path="/product" element={<Product />} />
            <Route path="/productForm" element={<ProductForm />} />
            <Route path="/uploadImage/:id" element={<ViewUplodaImage />} />
            <Route path="/customerDetails" element={<CustomerDetail />} />
            <Route path="/order" element={<Order/>}/>
            <Route path="/order/billDetails/:id" element={<BillDetails/>}/>
            <Route path="/order/ProductDetails/:id" element={<ProductDetails/>}/>
            <Route path="/employee" element={<AgentFrom />} /> 

          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;

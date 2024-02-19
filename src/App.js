import React, { useState } from "react";
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


axios.defaults.baseURL="http://localhost:5000";
axios.defaults.withCredentials=true;

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <>
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
    
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/category" element={<Category/>}/>
        <Route path="/categoryForm" element={<CategoryFrom/>}/>
        <Route path="/brand" element={<Brand/>}/>
        <Route path="/brandForm" element={<BrandFrom/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/productForm" element={<ProductForm/>}/>
        <Route path="/uploadImage/:id" element={<ViewUplodaImage/>}/>


      </Routes>
    </div>
    </>
    
  );
}

export default App;

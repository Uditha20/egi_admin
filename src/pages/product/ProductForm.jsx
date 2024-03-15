import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductForm({ existProduct, clearEditing }) {
  const initialProductName = existProduct ? existProduct.productName : "";
  const initialPrice = existProduct ? existProduct.price : "";
  const initialCount = existProduct ? existProduct.item_count : 0;
  const initialColor = existProduct ? existProduct.color : "";
  const initialSize = existProduct ? existProduct.size : "";
  const initialSelectedCategory =
    existProduct && existProduct.categoryId
      ? existProduct.categoryId 
      :  "" ;
  const initialSelectBrand =
    existProduct && existProduct.brandId ? existProduct.brandId._id : "";
  const initialMainImage = existProduct ? existProduct.mainImage : null;
  const initialAdditionalImages = existProduct
    ? existProduct.additionalImages
    : [];
   
  // useState hooks
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [productName, setProductName] = useState(initialProductName);
  const [price, setPrice] = useState(initialPrice);
  const [count, setCount] = useState(initialCount);
  const [color, setColor] = useState(initialColor);
  const [size, SetSize] = useState(initialSize);
  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategory
  );
  const [selectBrand, setSelectBrand] = useState(initialSelectBrand);
  const [mainImage, setMainImage] = useState(initialMainImage);
  const [additionalImages, setAdditionalImages] = useState(
    initialAdditionalImages
  );

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`/products/category/getBrandName?category=${selectedCategory}`)
        .then((response) => setBrandName(response.data))
        .catch((error) => console.error("Error fetching brands:", error));
    }
  }, [selectedCategory]);


  useEffect(() => {
    axios
      .get("/products/category/getAllCategory")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

 
  const handleMainImageChange = (event) => {
    setMainImage(event.target.files[0]);
  };

  const handleAdditionalImagesChange = (event) => {
    setAdditionalImages([...event.target.files]);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("item_count", count);
    formData.append("color", color);
    formData.append("size", size);
    formData.append("categoryId", selectedCategory);
    formData.append("brandId", selectBrand);
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }
    additionalImages.forEach((image) => {
      formData.append("additionalImages", image);
    });
console.log(formData)
for (let pair of formData.entries()) {
  console.log(`${pair[0]}: ${pair[1]}`);
}
    try {
      let response;
      if(existProduct){
        response = await axios.put(
          `/products/editProduct/${existProduct._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        window.location.href = `${process.env.REACT_APP_DASH_URL}/product`;
        clearEditing();
        console.log(response.data)
        
      }else{

        response = await axios.post("/products/addProduct", formData, {
           headers: {
             "Content-Type": "multipart/form-data",
           },
         });
         
      }
      if (response.data.message === "ok") {
        setMessage("Successfully added product");
        setErrMsg("");
        // Reset form fields
        setProductName("");
        setPrice("");
        setCount(0);
        setColor("");
        SetSize("");
        setSelectedCategory("");
        setSelectBrand("");
        setMainImage(null);
        setAdditionalImages([]);
      }
    } catch (err) {
      setErrMsg("Can't add product");
      console.error(err.message);
      setMessage("");
    }
  };

  console.log(selectBrand);
  console.log(selectedCategory)
  console.log(brandName)
 
 

  return (
    <div className="main pt-3" style={{ gridArea: "main" }}>
      <Link to={"/product"}>
        <FaArrowLeft size={30} className="mx-3" style={{ cursor: "pointer" }} />
      </Link>
      <div className="form-container">
        <form method="POST" onSubmit={addProduct}>
          {message && <p className="alert alert-success">{message}</p>}
          {errMsg && <p className="alert alert-danger">{errMsg}</p>}
          <div className="form-group pb-3">
            <label htmlFor="exampleInputEmail1">Product Name</label>
            <input
              type="text"
              className="form-control pt-2 mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={productName}
              //   value={data.brandName}
              placeholder="Ex: LG"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group pb-3">
            <label htmlFor="exampleInputEmail1">Product Price</label>
            <input
              type="text"
              className="form-control pt-2 mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={price}
              //   value={data.brandName}
              placeholder="Ex: $100"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group pb-3">
            <label htmlFor="exampleInputEmail1">Product count</label>
            <input
              type="text"
              className="form-control pt-2 mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={count}
              //   value={data.brandName}
              placeholder="Ex: 5"
              onChange={(e) => setCount(e.target.value)}
            />
          </div>
          <div className="form-group pb-3">
            <label htmlFor="exampleInputEmail1">color</label>
            <input
              type="text"
              className="form-control pt-2 mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={color}
              //   value={data.brandName}
              placeholder="Ex: red"
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="form-group pb-3">
            <label htmlFor="exampleInputEmail1">Product Size</label>
            <input
              type="text"
              className="form-control pt-2 mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={size}
              //   value={data.brandName}
              placeholder="Ex: Sm,lg"
              onChange={(e) => SetSize(e.target.value)}
            />
          </div>
          <div className="mt-3">
            Chose Category
            <select
              class="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories
                .filter((category) => category.isActive)
                .map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
            </select>
            <div className="mt-3">Chose Brand</div>
            <select
              className="form-select"
              value={selectBrand}
              onChange={(e) => setSelectBrand(e.target.value)}
            >
              <option value="" disabled>
                Select a brand
              </option>
              {brandName
                .filter((brand) => brand.isActive)
                .map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.brandName}
                  </option>
                ))}
            </select>
          </div>
          {/* File inputs for images */}
          <div className="form-group pb-3">
            <label className="mt-3">Main Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleMainImageChange}
            />
          </div>
          <div className="form-group">
            <label className="mt-2">Additional Images</label>
            <input
              type="file"
              className="form-control"
              multiple
              onChange={handleAdditionalImagesChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;

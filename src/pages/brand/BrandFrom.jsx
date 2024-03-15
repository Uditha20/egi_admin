import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function BrandFrom({ existingBrand, clearEditing }) {
  console.log(existingBrand);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    category: existingBrand ? existingBrand.category._id : "",
  });
  const [brandName, setBrandName] = useState({
    brandName: existingBrand ? existingBrand.brandName : "",
  });
  useEffect(() => {
    axios
      .get("/products/category/getAllCategory")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const addBrand = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (existingBrand) {
        response = await axios.put(
          `/products/brand/editBrand/${existingBrand._id}`,
          {
            brandName: brandName,
            category: selectedCategory,
          }
        );
        window.location.href = `${process.env.REACT_APP_DASH_URL}/brand`;
        clearEditing();
      } else {
        response = await axios.post("/products/brand/addBrand", {
          brandName: brandName,
          category: selectedCategory,
        });
      }
      if (response.data.message === "ok") {
        setMessage("Successfully added brand");
        setErrMsg("");
        setBrandName("");
      }
    } catch (err) {
      setErrMsg("Brand already exists.");
      console.error(err.message);
      setMessage("");
      setBrandName("");
    }
  };
  console.log(existingBrand);
  return (
    <div className="main pt-3" style={{ gridArea: "main" }}>
      <Link to={"/brand"}>
        <FaArrowLeft size={30} className="mx-3" style={{ cursor: "pointer" }} />
      </Link>
      <div className="form-container">
        <form method="POST" onSubmit={addBrand}>
          {/* Success message */}
          {message && <p className="alert alert-success">{message}</p>}

          {/* Error message */}
          {errMsg && <p className="alert alert-danger">{errMsg}</p>}

          <div className="form-group pb-3">
            <label htmlFor="exampleInputEmail1">Brand Name</label>
            <input
              type="text"
              className="form-control pt-2 mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={brandName.brandName}
              //   value={data.brandName}
              placeholder="Ex: LG"
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>
          <div className="mt-2">
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
          </div>

          <button type="submit" className="btn btn-primary mt-5">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BrandFrom;

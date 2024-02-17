import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function BrandFrom() {
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brandName, setBrandName] = useState("");
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

    //     const { categoryName } = data;
    //     try {
    //       const response = await axios.post("/products/category/addCategory", {
    //         categoryName,
    //       });
    //       if (response.data.message === "ok") {
    //         setMessage("Successfully added category.");
    //         setErrMsg(""); // Clear any previous error message
    //         setData({ categoryName: "" });
    //       }
    //     } catch (err) {
    //       setErrMsg("Category already exists.");
    //       setMessage(""); // Clear any previous success message
    //       console.error(err.message);
    //       setData({ categoryName: "" });
    //     }
    //   };
  };
  return (
    <div className="main pt-3" style={{ gridArea: "main" }}>
      <Link to={"/category"}>
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
              value={brandName}
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
              {categories.map((category) => (
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

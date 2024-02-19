import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function CategoryForm() {
  const [data, setData] = useState({
    categoryName: "",
  });

  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const addCategory = async (e) => {
    e.preventDefault();

    const { categoryName } = data;
    try {
      const response = await axios.post("/products/category/addCategory", {
        categoryName,
      });
      if (response.data.message === "ok") {
        setMessage("Successfully added category.");
        setErrMsg(""); // Clear any previous error message
        setData({ categoryName: "" });
        
      }
    } catch (err) {
      setErrMsg("Category already exists.");
      setMessage(""); // Clear any previous success message
      console.error(err.message);
      setData({ categoryName: "" });
    }
  };

  return (
    <div className="main pt-3" style={{ gridArea: "main" }}>
      <Link to={"/category"}><FaArrowLeft size={30} className="mx-3"style={{cursor:"pointer"}}/></Link>
      <div className="form-container">
        <form method="POST" onSubmit={addCategory}>
          {/* Success message */}
          {message && <p className="alert alert-success">{message}</p>}

          {/* Error message */}
          {errMsg && <p className="alert alert-danger">{errMsg}</p>}

          <div className="form-group pb-3">
            <label htmlFor="exampleInputEmail1">Category Name</label>
            <input
              type="text"
              className="form-control pt-2 mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={data.categoryName}
              placeholder="Ex: Electronic"
              onChange={(e) =>
                setData({ ...data, categoryName: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;

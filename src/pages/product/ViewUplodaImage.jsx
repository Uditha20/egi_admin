import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

function ViewUplodaImage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios
      .get(`/products/getOneProduct/${id}`) // Adjust API endpoint as needed
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const getPath = (pic) => {
    const separator = pic.includes("\\") ? "\\" : "/";
    return `${process.env.REACT_APP_API_URL}/uploads/${pic
      .split(separator)
      .pop()}`;
  };
  // console.log(product);

  return (
    <div className="main pt-3" style={{ gridArea: "main" }}>
      <Link to={"/product"}>
        <FaArrowLeft size={30} className="mx-3" style={{ cursor: "pointer" }} />
      </Link>
      <div className="row">
        <h2 className="d-flex justify-content-center">View Images</h2>
        <h3 className="mx-5">main Image</h3>
        <div className="col-3 mx-5">
          {product && (
            <>
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads/${product.mainImage.split(product.mainImage.includes("\\") ? "\\" : "/").pop()}`}
                alt={product.productName}
                style={{ height: "250px" }}
              />
            </>
          )}
        </div>
      </div>
      <div className="row">
        <h3 className="mt-3 mx-5">Additional image</h3>
        {product &&
          product.additionalImages.map((image, index) => (
            <div className="col-lg-3  mx-5">
              <img
                      src={getPath(image)}
                      alt={`Additional Image ${index}`}
                      className="img-fluid"
                    />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ViewUplodaImage;

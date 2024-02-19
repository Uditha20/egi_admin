import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  console.log(product);

  return (
    <div className="main pt-3" style={{ gridArea: "main"} }>
      <div className="row">
        <h2 className="d-flex justify-content-center">View Images</h2>
        <h3 className="mx-5">main Image</h3>
        <div className="col-3 mx-5">
          {/* <img src={`uploads/${product.mainImage}`} alt={product.productName} /> */}
          {product && (
            <>
              <img
                src={`http://localhost:5000/uploads/${product.mainImage.split("\\").pop()}`}
                alt={product.productName}  style={{height:'250px'}}
              />
        <div className="border" style={{width:'600px'}}>

              {product.additionalImages.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/uploads/${image
                    .split("\\")
                    .pop()}`}
                  alt={`Additional Image ${index + 1}`}
                  style={{height:'250px'}}/>
              ))}
        </div>
            </>
          )}
        </div>
      </div>
   
    </div>
  );
}

export default ViewUplodaImage;

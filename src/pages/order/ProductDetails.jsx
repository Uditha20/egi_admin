import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/order/getOneDetails/${id}`);
      setDetails(response.data.items);
    } catch (error) {
      //  window.location.href = "http://localhost:3000/";
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [updateTrigger]);

  console.log(details);
  return (
    <div className="m-5">
      <h3>ProductDetails</h3>
      <div
        className="border border-primary"
        style={{ height: "auto", width: "300px" }}
      >
        <div className="m-3">
          {details.map((itemDetails, index) => (
            <div>
              <p key={index}>
                Product Name:<b>{itemDetails.product.productName}</b>
              </p>
              <p>
                Product Price:<b>{itemDetails.product.price}</b>
              </p>
              <p>
                Product Color:<b>{itemDetails.product.color}</b>
              </p>
              <p>
                Product size:<b>{itemDetails.product.size}</b>
              </p>
              <p>
                Product Quantity:<b>{itemDetails.quantity}</b>
              </p>
              <p>
                Product Subtotal:<b>{itemDetails.subtotal}</b>
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BillDetails() {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/order/getOneDetails/${id}`);
      setDetails(response.data.billDetails);
    } catch (error) {
      //  window.location.href = "http://localhost:3000/";
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [updateTrigger]);

  // console.log(details);
  return (
    <div className="m-5">
      <h3>Bill Info:</h3>
      <div
        className="border border-primary"
        style={{ height: "auto", width: "300px" }}
      >
        <div className="m-3">
          {details.map((billDetails, index) => (
            <div>
              <p key={billDetails.phoneNo}>
               Name:<b>{billDetails.name}</b>
              </p>
              <p>
                Address:<b>{billDetails.address}</b>
              </p>
              <p>
                City/Town:<b>{billDetails.town}</b>
              </p>
              <p>
                Phone No:<b>{billDetails.phoneNo}</b>
              </p>
              <p>
                 E-mail:<b>{billDetails.email}</b>
              </p>
            
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BillDetails;

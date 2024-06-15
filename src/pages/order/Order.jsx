import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

function Order() {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [order, setOrder] = useState([""]);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");

  const fetchOrder = async () => {
    try {
      const response = await axios.get("/order/getDetails");
      const formattedData = response.data.map((order, index) => ({
        no: index + 1, // Adding a serial number
        orderid: order._id,
        name: order.user.name,
        gmail: order.user.username,
        total: order.total,
        status: order.status,
        date: new Date(order.createdAt).toLocaleString(), // Format date as needed
      }));

      setOrder(formattedData);
    } catch (error) {
      //  window.location.href = "http://localhost:3000/";
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [updateTrigger]);

  // console.log(order);
  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(`/order/updateOrder/${id}`, {});
      if (response.data && response.data.message) {
        setMsg(response.data.message);
        fetchOrder();
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: "serial",
        Cell: ({ row }) => row.index + 1, // This will start counting from 1
      },
      {
        Header: "Order-Id",
        accessor: "orderid",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "gmail",
        accessor: "gmail",
      },
      {
        Header: "total",
        accessor: "total",
      },
      {
        Header: "date",
        accessor: "date",
      },
      {
        Header: "Product",
        Cell: ({ row }) => (
          <button className="btn btn-primary">
            <Link
              to={`/order/ProductDetails/${row.original.orderid}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Details
            </Link>
          </button>
        ),
        id: "product",
      },
      {
        Header: "Bill Info:",
        Cell: ({ row }) => (
          <button className="btn btn-success">
            <Link
              to={`/order/billDetails/${row.original.orderid}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Details
            </Link>
          </button>
        ),
        id: "Details",
      },
      {
        Header: "status",
        Cell: ({ row }) => {
          const status = row.original.status;
          console.log(status); // Correctly accessing the status field
          let btnClass = "btn ";

          // Set button color based on status value
          switch (status) {
            case 1:
              btnClass += "btn-danger"; // Red
              break;
            case 2:
              btnClass += "btn-warning"; // Yellow
              break;
            case 3:
              btnClass += "btn-info"; // Assuming you have defined a custom class for orange color
              break;
            default:
              btnClass += "btn-secondary"; // Default color (gray)
          }

          return (
            <button
              className={btnClass}
              onClick={() => handleUpdate(row.original.orderid)}
            >
              {status === 1
                ? "Pending"
                : status === 2
                ? "In Progress"
                : status === 3
                ? "Complete"
                : "Unknown"}
            </button>
          );
        },
        id: "status",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: order });

  if (error) return <div>Error loading categories: {error.message}</div>;

  return (
    <div className="main-container">
      <div>{msg && <p className="alert alert-success">{msg}</p>}</div>
      <table {...getTableProps()} className="mx-4">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Order;

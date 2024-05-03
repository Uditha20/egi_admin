import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

function Order() {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [order, setOrder] = useState([""]);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    try {
      const response = await axios.get("/order/getDetails");
      const formattedData = response.data.map((order, index) => ({
        no: index + 1, // Adding a serial number
        orderid: order._id,
        name: order.user.name,
        gmail: order.user.username,
        total: order.total,
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

  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: "serial",
        Cell: ({ row }) => row.index + 1,
        // This will start counting from 1
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
          <button
            className="btn btn-primary"
            // onClick={() => handleUpdate(row.original._id)} // Use the correct property for ID
          >
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
          <button
            className="btn btn-success"
            // onClick={() => handleUpdate(row.original._id)} // Use the correct property for ID
          >
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
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: order });

  if (error) return <div>Error loading categories: {error.message}</div>;

  return (
    <div className="main-container">
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

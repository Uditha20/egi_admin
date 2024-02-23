import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link} from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const [updateTrigger, setUpdateTrigger] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios
        .get("/products/category/getAllCategory")
        .then((response) => {
          const activeCategories = response.data.filter(
            (item) => item.isActive === true
          );

          const mappedData = activeCategories.map((item) => ({
            ...item,
            first_name: item.categoryName,
          }));

          setCategories(mappedData);
        })
        .catch((error) => {
        
          setError(error);
        });
    } catch (error) {
   
      console.error("Error fetching categories:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [updateTrigger]);

  const handleUpdate = async (id) => {
    const updateColumn = await axios.post(`/products/category/delete/${id}`);
    if (updateColumn.data.message === "ok") {
      alert("Delete Complete");
      setUpdateTrigger((prev) => !prev);
    }
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Category Name",
        accessor: "first_name", // Adjust according to your data
      },
      {
        Header: "Edit",
        Cell: ({ row }) => (
          <button
            className="btn btn-primary"
            onClick={() => handleUpdate(row.original._id)} // Use the correct property for ID
          >
            Edit
          </button>
        ),
        id: "edit",
      },
      {
        Header: "Delete",
        Cell: ({ row }) => (
          <button
            className="btn btn-danger"
            onClick={() => handleUpdate(row.original._id)} // Use the correct property for ID
          >
            Delete
          </button>
        ),
        id: "Delete",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: categories });

  if (error) return <div>Error loading categories: {error.message}</div>;

  return (
    <div className="main-container">
      <Link to={"/categoryForm"}>
        <button className="btn btn-primary category-btn m-4">
          Add Category +
        </button>
      </Link>
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

export default Category;

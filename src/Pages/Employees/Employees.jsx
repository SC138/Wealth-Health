import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";

const Employees = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setData(savedEmployees);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = useCallback(
    (employeeId) => {
      const updatedEmployees = data.filter(
        (employee) => employee.id !== employeeId
      );
      setData(updatedEmployees);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    },
    [data]
  ); // data est une dépendance de handleDelete

  const handleUpdate = useCallback(
    (employeeId) => {
      navigate(`/edit-employee/${employeeId}`);
    },
    [navigate]
  ); // navigate est une dépendance de handleUpdate

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "FirstName" },
      { Header: "Last Name", accessor: "LastName" },
      {
        Header: "Date of Birth",
        accessor: "DateOfBirth",
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: "Start Date",
        accessor: "StartDate",
        Cell: ({ value }) => formatDate(value),
      },
      { Header: "Street", accessor: "Street" },
      { Header: "City", accessor: "City" },
      { Header: "State", accessor: "State" },
      { Header: "Zip Code", accessor: "ZipCode" },
      { Header: "Department", accessor: "Department" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <>
            <button onClick={() => handleUpdate(row.original.id)}>
              Update
            </button>
            <button onClick={() => handleDelete(row.original.id)}>
              Delete
            </button>
          </>
        ),
      },
    ],
    [handleDelete, handleUpdate]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const pageSizeOptions = [10, 25, 50, 100];

  const handleSearch = (e) => {
    setGlobalFilter(e.target.value || undefined);
  };

  return (
    <>
      <div className="employees-page">
        <Link to="/">
          <img src={logo} alt="Logo wealth health" className="logo-wh" />
        </Link>
        <h2>Current Employees</h2>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="search"
        />
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <span className="sort-icon desc active">▼</span>
                        ) : (
                          <span className="sort-icon asc active">▲</span>
                        )
                      ) : (
                        <>
                          <span className="sort-icon desc">▼</span>
                          <span className="sort-icon asc">▲</span>
                        </>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
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
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>
          <span>
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
        <Link to="/">Return to HomePage</Link>
      </div>
    </>
  );
};

export default Employees;

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.webp";
import { Modal } from "react-new-modal-plugin";
import editIcon from "../../assets/img/pen-to-square-solid.svg";
import trashIcon from "../../assets/img/trash-can-solid.svg";

const Employees = () => {
  const navigate = useNavigate(); // Hook pour la navigation
  const [data, setData] = useState([]); // État pour stocker les données des employés
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour ouvrir/fermer la modale
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null); // État pour stocker l'ID de l'employé à supprimer

  useEffect(() => {
    // Récupére les données des employés depuis le stockage local
    const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setData(savedEmployees);
  }, []);

  const formatDate = (dateString) => {
    // Fonction pour formater la date au format JJ/MM/AAAA
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const actionYes = useCallback(() => {
    // Fonction pour supprimer l'employé et fermer la modale
    if (currentEmployeeId == null) return;
    const updatedEmployees = data.filter(
      (employee) => employee.id !== currentEmployeeId
    );
    setData(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setIsModalOpen(false); // Fermer la modale après action
    setCurrentEmployeeId(null); // Réinitialiser l'ID de l'employé
  }, [currentEmployeeId, data]);

  const actionNo = () => {
    // Fonction pour fermer la modale sans supprimer l'employé
    setIsModalOpen(false);
  };

  const deleteEmployee = useCallback((idEmployee) => {
    setCurrentEmployeeId(idEmployee); // Stocker l'ID de l'employé à supprimer
    setIsModalOpen(true); // Ouvrir la modale
  }, []);

  const handleUpdate = useCallback(
    // Fonction pour naviguer vers la page de mise à jour de l'employé
    (employeeId) => {
      navigate(`/${employeeId}`);
    },
    [navigate]
  );

  const columns = useMemo(
    // Définition des colonnes pour le tableau
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
          // Afficher les boutons d'édition et de suppression
          <>
            <button
              onClick={() => handleUpdate(row.original.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginRight: "35px",
                width: "20px"
              }}
              alt="Edit"
              title="Edit"
            >
              <img className="icn-edit"src={editIcon} alt="Edit" />
              {/* <FontAwesomeIcon icon={faEdit} size="2x" /> */}
            </button>
            <button
              onClick={() => deleteEmployee(row.original.id)}
              style={{ background: "none", border: "none", cursor: "pointer", width: "20px"}}
              alt="Delete"
              title="Delete"
            >
              <img className="icn-delete" src={trashIcon} alt="Delete" />
              {/* <FontAwesomeIcon icon={faTrashAlt} size="2x" /> */}
            </button>
          </>
        ),
      },
    ],
    [deleteEmployee, handleUpdate]
  );

  // Utilisation de la bibliothèque react-table pour la pagination, le tri et la recherche
  const {
    getTableProps, // Propriétés de la table
    getTableBodyProps, // Propriétés du corps de la table
    headerGroups, // Groupes d'en-tête
    page, // Page actuelle
    prepareRow, // Fonction pour préparer la ligne
    canPreviousPage, // Booléen pour la page précédente
    canNextPage, // Booléen pour la page suivante
    pageOptions, // Options de page
    pageCount, // Nombre de pages
    gotoPage, // Fonction pour aller à une page
    nextPage, // Fonction pour aller à la page suivante
    previousPage, // Fonction pour aller à la page précédente
    setPageSize, // Fonction pour définir la taille de la page
    state: { pageIndex, pageSize },
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  // Options pour la taille de la page
  const pageSizeOptions = [10, 25, 50, 100];

  // Fonction pour gérer la recherche
  const handleSearch = (e) => {
    setGlobalFilter(e.target.value || undefined);
  };

  // Style pour la modale de confirmation
  const style = {
    textAlign: "center",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <>
      <div className="employees-page">
        {/* Lien pour retourner à la page d'accueil */}
        <Link to="/">
          <img src={logo} alt="Logo wealth health" className="logo-wh" />
        </Link>
        <h2>Current Employees</h2>
        {/* Champ de recherche pour filtrer les employés */}
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="search"
        />
        {/* Sélecteur pour la taille de page */}
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
        {/* Table des employés avec pagination et tri */}
        <table {...getTableProps()}>
          <thead>
            {/* Génération des en-têtes de colonne */}
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* Indicateurs de tri */}
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
            {/* Affichage des lignes de données de la page actuelle */}
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
        {/* Barre de pagination */}
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
        {/* Lien pour retourner à la page d'accueil */}
        <Link to="/">Return to HomePage</Link>
      </div>
      {/* Modale de confirmation pour la suppression d'un employé */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          style={style}
        >
          <h3 className="titleModal">
            Are you sure? This action is irreversible!
          </h3>
          <div>
            <button className="btnDelete btnModal" onClick={actionYes}>
              Yes
            </button>
            <button className="btnNo btnModal" onClick={actionNo}>
              No
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Employees;

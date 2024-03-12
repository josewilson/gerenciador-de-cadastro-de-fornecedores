import React, { useState, useEffect } from "react";
import axios from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus, faArrowsRotate, faEye} 
from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"


const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    axios
      .get("/suppliers")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => console.error("Ocorreu um erro: ", error));
  };

  const deleteSupplier = (id) => {
    axios
      .delete(`/suppliers/${id}`)
      .then(() => {
        alert("Fornecedor excluído com sucesso!");
        fetchSuppliers();
      })
      .catch((error) => console.error("Ocorreu um erro: ", error));
  };

  return (
    <div className="container mt-5">
      <h2>Lista de Fornecedores</h2>
      <button
        onClick={() => navigate("/add-fornecedor")}
        className="btn btn-primary mb-2"
      >
        <FontAwesomeIcon icon={faPlus} /> Adicionar
      </button>
      <button className="btn btn-primary mb-2 ml-3" onClick={fetchSuppliers}>
        <FontAwesomeIcon icon={faArrowsRotate} /> Atualizar Lista
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Nome:</th>
            <th>CNPJ:</th>
            <th>Email:</th>
            <th>Ações:</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.cnpj}</td>
              <td>{supplier.email}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning mr-2 ml-2"
                  onClick={() => navigate(`/editar-fornecedor/${supplier.id}`)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} /> Editar
                </button>
                <button
                  onClick={() => deleteSupplier(supplier.id)}
                  className="btn btn-sm btn-danger m-2 ml-2"
                >
                  <FontAwesomeIcon icon={faTrash} /> Excluir
                </button>
                <button
                  onClick={() => setSelectedSupplier(supplier)} // Definindo o fornecedor selecionado ao clicar em "Detalhes"
                  className="btn btn-sm btn-success ml-2"
                >
                  <FontAwesomeIcon icon={faEye} /> Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Renderização condicional dos detalhes do fornecedor */}
      {selectedSupplier && (
        <div>
          <h3>Detalhes do Fornecedor</h3>
          <p>Nome: {selectedSupplier.name}</p>
          <p>CNPJ: {selectedSupplier.cnpj}</p>
          <p>Email: {selectedSupplier.email}</p>
          <button
            className="btn btn-primary mb-2 ml-3"
            onClick={() => setSelectedSupplier(null)}
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default SupplierList;
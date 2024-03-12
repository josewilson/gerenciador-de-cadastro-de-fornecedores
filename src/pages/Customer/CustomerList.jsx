import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus, faArrowsRotate, faEye} from "@fortawesome/free-solid-svg-icons";
import axios from "../../api"

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Estado para controlar o cliente selecionado
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) =>
        console.error("Ocorreu um erro ao listar os clientes: ", error)
      );
  };

  const deleteCustomer = (id) => {
    axios
      .delete(`/customers/${id}`)
      .then(() => {
        alert("Cliente excluído com sucesso");
        fetchCustomers();
      })
      .catch((error) =>
        console.error("Ocorreu um erro ao excluir o cliente: ", error)
      );
  };

  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="container mt-5">
      <h2>Lista de Clientes</h2>
      <button
        onClick={() => navigate("/add-cliente")}
        className="btn btn-primary mb-2"
      >
        <FontAwesomeIcon icon={faPlus} /> Adicionar Cliente
      </button>
      <button className="btn btn-primary mb-2 ml-3" onClick={fetchCustomers}>
        <FontAwesomeIcon icon={faArrowsRotate} /> Atualizar Lista
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Nome:</th>
            <th>CPF:</th>
            <th>Email:</th>
            <th>CEP:</th>
            <th>Rua:</th>
            <th>Número:</th>
            <th>Bairro:</th>
            <th>Cidade:</th>
            <th>Estado:</th>
            <th>País:</th>
            <th>Ações:</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.cpf}</td>
              <td>{customer.email}</td>
              <td>{customer.zipcode}</td>
              <td>{customer.street}</td>
              <td>{customer.number}</td>
              <td>{customer.neighborhood}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
              <td>{customer.country}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning mr-2 ml-2"
                  onClick={() => navigate(`/editar-cliente/${customer.id}`)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} /> Editar
                </button>
                <button
                  onClick={() => deleteCustomer(customer.id)}
                  className="btn btn-sm btn-danger m-2 ml-2"
                >
                  <FontAwesomeIcon icon={faTrash} /> Excluir
                </button>
                <button
                  className="btn btn-sm btn-success ml-2"
                  onClick={() => viewCustomerDetails(customer)} // Definindo o cliente selecionado ao clicar em "Detalhes"
                >
                  <FontAwesomeIcon icon={faEye} /> Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Renderização condicional dos detalhes do cliente */}
      {selectedCustomer && (
        <div>
          <h3>Detalhes do Cliente</h3>
          <p>Nome: {selectedCustomer.name}</p>
          <p>CPF: {selectedCustomer.cpf}</p>
          <p>Email: {selectedCustomer.email}</p>
          <p>CEP: {selectedCustomer.zipcode}</p>
          <button
            className="btn btn-primary mb-2 ml-3"
            onClick={() => setSelectedCustomer(null)}
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
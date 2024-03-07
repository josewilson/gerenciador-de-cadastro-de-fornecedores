import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPenToSquare, faTrash, faPlus, faArrowsRotate, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api'


const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/customer')
        .then(response => {
            setCustomers(response.data)
        })
        .catch(error => console.error("Ocorreu um erro ao listar os clientes: ",error))
    }, []);

    
    function deleteCustomer(id) {
        axios.delete(`/customers/${id}`)
        .then(() => {
          alert('Cliente excluído com sucesso');
      })
        .catch(error => console.error("Ocorreu um erro:", error));
    }
    
  return (

    <div className="container mt-5">
        <h2>Lista de Clientes</h2>
        <button onClick={() => navigate('/add-cliente')} 
        className='btn btn-primary mb-2'><FontAwesomeIcon icon={faPlus} /> Adicionar Cliente</button>
        <button className='btn btn-primary mb-2 ml-3'><FontAwesomeIcon 
        icon={faArrowsRotate} onClick={fetchCustomers} /></button>
        
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
                </tr>
            </thead>
            <tbody>
                {
                    customers.map( customer => (
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
						  
                              <button className='btn btn-sm btn-warning mr-2 ml-2' 
                              onClick={() => navigate(`/editar-cliente/${customer.id}`)}>
                                    <FontAwesomeIcon icon={faPenToSquare} /> Editar
                              </button>
							  
                              <button onClick={() => deleteCustomer(customer.id)} 
                              className='btn btn-sm btn-danger m-2 ml-2'>
                                    <FontAwesomeIcon icon={faTrash} /> Excluir
                              </button>
                              <button onClick={() => getCustomer(customer.id)} 
                              className='btn btn-sm btn-success ml-2'>
                                    <FontAwesomeIcon icon={faEye} /> Detalhes
							  </button>	
                            
                          </td>        
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>
    
  )
}

export default CustomerList
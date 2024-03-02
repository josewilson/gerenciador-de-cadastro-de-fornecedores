import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api'

const SupplierForm = () => {

    const [supplier, setSupplier] = useState({name: '', cnpj: '', email: ''})
    const navigate = useNavigate();

    useEffect(() => {
          axios.get('/suppliers').then((response) => {
          const existingSuppliers = response.data;
          const maxId = existingSuppliers.reduce((max, supplier) => Math.max(max, supplier.id), 0);
          setSupplier((prevSupplier) => ({ ...prevSupplier, id: maxId + 1 }));
        });
      }, []); 

    function handleChange(event) {
        const { name, value } = event.target
        setSupplier(prevState => ({ ...prevState, [name]: value }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        axios.post('/suppliers', supplier)
        .then(() => {
            alert('Fornecedor adicionado com sucesso!')
            navigate("/")
        })
        .catch(error => console.error("Ocorreu um erro: ",error))
    }

  return (
    <div className="container mt-5">
        <h2>Adicionar Fornecedor</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nome do fornecedor:</label>
                <input type="text" 
                className="form-control" 
                id="name" name="name" 
                value={supplier.name} 
                onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="cnpj">CNPJ do fornecedor:</label>
                <input type="text" 
                className="form-control" 
                id="cnpj" name="cnpj" 
                value={supplier.cnpj} 
                onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email do fornecedor:</label>
                <input type="text" 
                className="form-control" 
                id="email" name="email" 
                value={supplier.email} 
                onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-success">Adicionar</button>
        </form>

    </div>
  )
}

export default SupplierForm
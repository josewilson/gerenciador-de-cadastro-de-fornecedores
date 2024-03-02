import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api'

const SupplierForm = () => {

    const [supplier, setSupplier] = useState({name: '', cnpj: '', email: ''})
    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        if(id) { 
             axios.get(`/suppliers/${id}`)
            .then(response => {
                setSupplier(response.data)
            })
            .catch(error => console.error('Erro ao buscar fornecedor', error))
        } else {
            setSupplier({})
        }
    },[id])

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
        const method = id ? 'put' : 'post'   
        const url = id ? `/suppliers/${id}` : 'suppliers'
        
        axios[method](url, supplier)
        .then(() => {
            alert(`Fornecedor ${id ? 'Atualizado' : 'Adicionado'} com sucesso!`)
            navigate("/")
        })
        .catch(error => console.error("Ocorreu um erro: ",error))
    }

  return (
    <div className="container mt-5">
        <h2>{id ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</h2>
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
            <button type="submit" className={id ? 'btn btn-warning' : 'btn btn-success'}>{id ? 'Atualizar' : 'Adicionar'}
            </button>
        </form>

    </div>
  )
}

export default SupplierForm
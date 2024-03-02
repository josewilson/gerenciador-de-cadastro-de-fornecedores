import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="menu">
        <div>
           <Link to="/">Painel de Controle</Link>
           <Link to="/add-fornecedor">Adicionar Fornecedor</Link>
           <Link to="/listar-fornecedores">Listar Fornecedores</Link> 
        </div>
    </nav>
   
  )
}

export default Navbar
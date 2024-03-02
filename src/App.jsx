import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import SupplierList from './pages/Supplier/SupplierList'
import './App.css'
import SupplierForm from './pages/Supplier/SupplierForm'
import ProductList from './pages/Product/ProductList'
import ProductForm from './pages/Product/ProductForm'
import CostumerForm from './pages/Costumer/CostumerForm'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<SupplierList />} />
          <Route path="/add-fornecedor" element={<SupplierForm />} />
          <Route path="/listar-fornecedores" element={<SupplierList />} />
          <Route path="/editar-fornecedor/:id" element={<SupplierForm />} />
          <Route path="/listar-produtos" element={<ProductList />} />
          <Route path="/add-produto" element={<ProductForm />} />
          <Route path="/editar-produto/:id" element={<ProductForm />} />
          <Route path="/add-cliente" element={<CostumerForm />} />
        </Routes>
      </div>

    </BrowserRouter>

  )
}

export default App
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import SupplierList from './pages/Supplier/SupplierList'
import './App.css'
import SupplierForm from './pages/Supplier/SupplierForm'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<SupplierList />} />
          <Route path="/add-fornecedor" element={<SupplierForm />}/>
          <Route path="/listar-fornecedores" element={<SupplierList />} />
        </Routes>
      </div>

    </BrowserRouter>

  )
}

export default App
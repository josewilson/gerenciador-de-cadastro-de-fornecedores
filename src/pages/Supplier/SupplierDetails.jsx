import React from 'react'

const SupplierDetails = () => {
  
    const [supplier, setSupplier] = useState({name: '', cnpj: '', email: ''})
    const navigate = useNavigate()

    function handleChange(event) {
        const { name, value } = event.target
        setSupplier(prevState => ({ ...prevState, [name]: value }))
    }

    function handleSubmit(event) {
        event.preventDefault() //impede que a pagina seja recarregada ao apertar no botão submit

        axios.post('/suppliers', supplier)
        .then(() => {
            alert("Fornecedor adicionado com sucesso.")
            navigate("/") //redireionar para pagina principal
        })
        .catch(error => console.error("Ocorreu um erro ao obter um fornecedor: ", error))
    }

  return (
    <div className='container mt-5'>
        <h2>Detalhes do Fornecedor</h2>

        <form action="" onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="name">Nome do Fornecedor: </label>
                <input 
                type="text" 
                className='form-control' 
                id='name' 
                name='name' 
                value={supplier.name} 
                placeholder='Fornecedor abc' 
                onChange={handleChange} 
                required/>
            </div>

            <div className='form-group'>
                <label htmlFor="cnpj">CNPJ: </label>
                <input 
                type="text" 
                className='form-control' 
                id='cnpj' 
                name='cnpj' 
                value={supplier.cnpj} 
                placeholder='xx.xxx.xxx/xxxx-xx' 
                onChange={handleChange} 
                required/>
            </div>

            <div className='form-group'>
                <label htmlFor="email">Email: </label>
                <input 
                type="text" 
                className='form-control' 
                id='email' 
                name='email' 
                value={supplier.email} 
                placeholder='empresa@mail.com' 
                onChange={handleChange} 
                required/>
            </div>
            <button type='submit' className='btn btn-success'>Adicionar</button>
        </form>

    
    </div>
  )
}

export default SupplierDetails
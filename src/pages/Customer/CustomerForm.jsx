import axios from '../../api'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const CustomerForm = () => {

    const [customer, setCustomer] = useState({
        name: '', 
        cpf: '', 
        email: '', 
        zipcode: '', 
        street: '', 
        number: '',
        neighborhood: '', 
        city: '', 
        state: '', 
        country: ''
    })
    const [cepLoading, setCepLoading] = useState(false)

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {

        if (id) {
            axios.get(`/customers/${id}`)
                .then(response => {
                    setCustomer(response.data)
                })
                .catch(error => console.error("Error ao buscar cliente", error))
        } else {
            setCustomer({
                name: '', cpf: '', email: '', zipcode: '', street: '', number: '', neighborhood: '', city: '', state: '', country: ''
            })
        }
    }, [id])

    function handleChange(event) {
        const { name, value } = event.target
        setCustomer(prevState => ({ ...prevState, [name]: value }))
    }

    function handleSubmit(event) {
        event.preventDefault() //impede que a pagina seja recarregada ao apertar no botão submit

        const method = id ? 'put' : 'post'
        const url = id ? `/customers/${id}` : `/customers`

        axios[method](url, customer)
            .then(() => {
                alert(`Cliente ${id ? "atualizado" : "adicionado"} com sucesso.`)
                navigate("/listar-clientes") //redireionar para pagina principal
            })
            .catch(error => console.error("Ocorreu um erro ao obter um cliente: ", error))
    }

    function handleCepBlur(event) {
        // Vai consultar a api dos correios
        const cep = event.target.value.replace(/\D/g, '')
        if (cep.length !== 8) {
            alert("CEP tem que ter mais 8 digitos.") //melhorar o alert para exibir uma mensagem personalizada
            return
        }
        setCepLoading(true)

        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if(response.data.erro) {
                    alert("CEP não encontrado")
                    setCepLoading(false)
                    return
                }
                setCustomer(prevState => ({
                    ...prevState,
                    street: response.data.logradouro,
                    neighborhood: response.data.bairro,
                    city: response.data.localidade,
                    state: response.data.uf,
                    country: "Brasil"
                }))
                setCepLoading(false)
            })
            .catch(error => {
                console.error(`Error ao buscar o cep do cliente ${customer.name}`, error)
                setCepLoading(false)
            })

    }

    return (

        <div className="container mt-5">
            <h2>{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="name">Nome do Cliente</label>
                    <input type="text" 
                    className="form-control" 
                    id="name" name="name" 
                    value={customer.name} 
                    onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="cpf">CPF do cliente</label>
                    <input type="text" 
                    className="form-control" 
                    id="cpf" name="cpf" 
                    value={customer.cpf} 
                    onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email do cliente</label>
                    <input type="text" 
                    className="form-control" 
                    id="email" name="email" 
                    value={customer.email} 
                    onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="zipcode">CEP</label>
                    <input type="text" 
                    className="form-control" 
                    id="zipcode" 
                    name="zipcode" 
                    value={customer.zipcode} 
                    onChange={handleChange} 
                    onBlur={handleCepBlur} required />
                    {cepLoading && <p>Buscando CEP...</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="street">Rua/logradouro</label>
                    <input type="text" 
                    className="form-control" 
                    id="street" name="street" 
                    value={customer.street} 
                    onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="number">Número</label>
                    <input type="text" 
                    className="form-control" 
                    id="number" 
                    name="number" 
                    value={customer.number} 
                    onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="neighborhood">Bairro</label>
                    <input type="text" 
                    className="form-control" 
                    id="neighborhood" 
                    name="neighborhood" 
                    value={customer.neighborhood} 
                    onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="city">Cidade</label>
                    <input type="text" 
                    className="form-control" 
                    id="city" 
                    name="city" 
                    value={customer.city} 
                    onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="state">Estado</label>
                    <input type="text" 
                    className="form-control" 
                    id="state" 
                    name="state" 
                    value={customer.state} 
                    onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="number">País</label>
                    <input type="text" 
                    className="form-control" 
                    id="country" 
                    name="country" 
                    value={customer.country} 
                    onChange={handleChange} required />
                </div>

                <button type="submit" className={id ? "btn btn-warning" : "btn btn-success"}>{id ? 'Atualizar' : 'Adicionar'}</button>
            </form>
        </div>

    )
}

export default CustomerForm
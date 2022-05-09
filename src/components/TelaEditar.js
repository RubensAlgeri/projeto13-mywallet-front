import axios from "axios";
import styled from "styled-components";
import React from "react";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";


export default function TelaEditar() {
    const navigate = useNavigate();
    const { id, tipo } = useLocation().state;
    const userData = useContext(UserContext).userData
    const { token } = userData;
    const [entrada, setEntrada] = useState({ valor: "", descricao: "" })
    const { valor, descricao } = entrada;

    function alterarRegisto(event) {
        event.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promessa = axios.put(`https://projeto-13-mywallet.herokuapp.com/records/${id}`, { value: valor, description: descricao }, config)
        promessa.then(() => {
            navigate("/registros")
        })
        promessa.catch((err) => { alert(`deu ruim, ${err.message}`) })
    }
    function cancelar() {
        navigate("/registros")
    }
    return (
        <>
            <Login>
                <h1>Editar {tipo}</h1>
                <form onSubmit={alterarRegisto}>
                    <input
                        type="text"
                        placeholder="Valor (0,00)"
                        pattern={/^[0-9]*,[0-9]{2}$/}
                        value={entrada.valor}
                        onChange={(e) =>
                            setEntrada({ valor: e.target.value, descricao })
                        }
                        required
                    ></input>
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={entrada.descricao}
                        min="3"
                        onChange={(e) =>
                            setEntrada({ valor, descricao: e.target.value })
                        }
                        required
                    ></input>
                    <button type="submit">Atualizar {tipo}</button>
                    <button onClick={cancelar}>Cancelar</button>
                </form>
            </Login>
        </>
    )
}
const Login = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
width: auto;
h1 {
    margin: 159px 0 24px 0;
    font-weight: 700;
    font-size: 32px;
    line-height: 50px;

    color: #FFFFFF;
}
form{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 500px;
}
input{
    width: 303px;
    height: 45px;
    margin-bottom: 13px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
}
button{
    margin-bottom: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 303px;
    height: 45px;
}
`
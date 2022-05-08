import axios from "axios";
import styled from "styled-components";
import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function TelaEditar() {
    const navigate = useNavigate();
    const { id, tipo } = useLocation()
    const userData = useContext(UserContext).userData
    console.log(userData)
    const { name, token } = userData;
    const [entrada, setEntrada] = useState({ valor: "", descricao: "" })
    const { valor, descricao } = entrada;
    function alterarRegisto(idRegistro) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promessa = axios.put(`http://localhost:5000/records/${idRegistro}`, config)
        promessa.then(() => {
            navigate("/registros")
        })
        promessa.catch((err) => { alert(`deu ruim, ${err}`) })
    }
    return (
        <>
            <Login>
                <h1>Editar {tipo}</h1>
                <form onSubmit={alterarRegisto}>
                    <input
                        type="text"
                        placeholder="Valor"
                        value={entrada.valor}
                        onChange={(e) =>
                            setEntrada({ value: e.target.valor, descricao })
                        }
                        required
                    ></input>
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={entrada.descricao}
                        onChange={(e) =>
                            setEntrada({ valor, descricao: e.target.value })
                        }
                        required
                    ></input>
                    <button type="submit">Atualizar {tipo}</button>
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
    font-family: 'Saira Stencil One', cursive;
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
    margin-bottom: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 303px;
    height: 45px;
}
`
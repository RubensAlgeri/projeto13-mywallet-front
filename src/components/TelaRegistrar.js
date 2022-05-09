import axios from "axios";
import styled from "styled-components";
import React from "react";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

export default function TelaRegistrar() {
    const navigate = useNavigate();
    const { tipo } = useLocation().state;
    const userData = useContext(UserContext).userData
    const { token } = userData;
    const [entrada, setEntrada] = useState({ valor: "", descricao: "" })
    const { valor, descricao } = entrada
    
    function enviar(event) {
        event.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promessa = axios.post(
            "https://projeto-13-mywallet.herokuapp.com/records",
            { value: valor, description: descricao, type: tipo, date: dayjs().locale("pt-br").format('DD/MM') }, config
        );
        promessa.then(() => {
            navigate("/registros");
        });
        promessa.catch((err) => {
            alert(`deu ruim, ${err}`);
        });
    }
    function cancelar() {
        navigate("/registros")
    }
    return (
        <>
            <Login>
                <h1>Nova {tipo}</h1>
                <form onSubmit={enviar}>
                    <input
                        type="text"
                        placeholder="Valor"
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
                        onChange={(e) =>
                            setEntrada({ valor, descricao: e.target.value })
                        }
                        required
                    ></input>
                    <button type="submit">Salvar {tipo}</button>
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
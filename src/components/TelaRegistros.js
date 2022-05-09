import axios from "axios";
import styled from "styled-components";
import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function TelaRegistros() {

    const navigate = useNavigate();
    const [listaRegistros, setListaRegistros] = useState([])
    const [saldo, setSaldo] = useState([])
    const { userData, setUserData } = useContext(UserContext)
    const { name, token } = userData;

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(`http://localhost:5000/records`, config)
        promise.then((resposta) => {
            setListaRegistros(resposta.data.records);
            setSaldo(resposta.data.balance);
        })
        promise.catch((err) => { alert(`deu ruim, ${err}`) })
    }, []);

    function removerRegistro(idRegistro) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if (window.confirm("Você quer mesmo deletar este registro?") === true) {
            const promessa = axios.delete(`http://localhost:5000/records/${idRegistro}`, config)
            promessa.then(() => {
                const promise = axios.get(`http://localhost:5000/records`, config)
                promise.then((resposta) => {
                    setListaRegistros(resposta.data.records);
                    setSaldo(resposta.data.balance);
                })
                promise.catch((err) => { alert(`deu ruim, ${err}`) })
            })
        }
    }

    function deslogar() {
        setUserData([])
        navigate("/")
    }

    return (
        <>
            <Topo>
                <p>Olá, {name}</p>
                <ion-icon onClick={deslogar} name="log-out-outline"></ion-icon>
            </Topo>
            <Registros tipo={saldo ? saldo.type : null}>
                <ul>
                    {listaRegistros.length > 0 ?
                        listaRegistros.map(registro => {
                            return (
                                <Registro key={registro._id} tipo={registro.type}>
                                    <li onClick={() => navigate("/editar", { state: { id: registro._id, tipo: registro.type } })}>
                                        <span >{registro.date}</span>
                                        <em>{registro.description} </em>
                                        <b>{registro.value}</b>
                                    </li>
                                    <ion-icon onClick={() => removerRegistro(registro._id)} name="close-outline"></ion-icon>
                                </Registro>
                            )
                        })
                        : (<p>Não há registros de entrada ou saída</p>)}
                    {saldo ?
                        <>
                            <h5>SALDO</h5>
                            <h4>{saldo.balance}</h4>
                        </>
                        :
                        <></>
                    }
                </ul>
            </Registros>
            <Botoes>
                <button onClick={() => navigate("/registrar", { state: { tipo: 'entrada' } })}>
                    <ion-icon name="add-circle-outline"></ion-icon>

                    <p>Nova entrada</p>
                </button>
                <button onClick={() => navigate("/registrar", { state: { tipo: 'saída' } })}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova saída</p>
                </button>
            </Botoes>
        </>
    )
}
const Registro = styled.div`
display: flex;
align-items: center;
width: 100%;
margin: 10px 0 0 12px;
li{
    width: 100%;
    position: relative;
}
ion-icon{
    position: absolute;
    right: 10px;
    color: #C6C6C6;
}
em{
    position: absolute;
    left: 60px;
}
span{
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
    margin-right: 5px;
}
b{
    position: absolute;
    right: 41px;
    color: ${props => props.tipo === "entrada" ? "#03AC00" : "#C70000"};
}
`
const Topo = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 326px;
margin: 25px auto;
p{
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
}
`
const Registros = styled.div`
overflow: hidden;
position: relative;
display: flex;
flex-wrap: wrap;
width: 326px;
height: 446px;
margin: 0 auto;
background: #FFFFFF;
border-radius: 5px;
ul{
    overflow: hidden;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
}
p{
    width: 180px;
    height: 46px;
    margin: auto;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
}
h5{
    position: absolute;
    bottom: 10px;
    left: 15px;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000
}
h4{
    position: absolute;
    bottom: 10px;
    right: 11px;
    color: ${props => props.tipo === "entrada" ? "#03AC00" : "#C70000"};
}
`
const Botoes = styled.div`
display:flex;
height: 114px;
width: 325px;
justify-content: space-between;
margin: 13px auto;
button{
    display: flex;
    flex-wrap: wrap;
    align-items: space-between;
    width: 155px;
    height: 114px;
}
ion-icon{
    margin: 9px 100px 0 10px;
}
p{
    margin: 10px 0 0 10px;
    text-align: start;
    width: 64px;
}
`
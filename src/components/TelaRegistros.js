import axios from "axios";
import styled from "styled-components";
import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function TelaRegistros() {
    const navigate = useNavigate();
    const [listaRegistros, setListaRegistros] = useState([])
    const userData = useContext(UserContext).userData
    console.log(userData)
    const { name, token } = userData;

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(`http://localhost:5000/records`, config)
        promise.then((resposta) => {
            setListaRegistros(resposta.data);
        })
        promise.catch((err) => { alert(`deu ruim, ${err}`)})
    }, []);

    function removerRegistro(idRegistro) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if(window.confirm("Você quer mesmo deletar este hábito?")==true){
            const promessa = axios.delete(`http://localhost:5000/records/${idRegistro}`, config)
            promessa.then(() => {
                const promise = axios.get(`http://localhost:5000/records`, config)
                promise.then((resposta) => {
                    setListaRegistros(resposta.data);
                })
                promise.catch((err) => { alert(`deu ruim, ${err}`) })
            })
        }
    }


    return (
        <>
            <Topo>
                <p>Olá, {name}</p>
                <ion-icon name="log-out-outline"></ion-icon>
            </Topo>
            <Registros>

            {listaRegistros.length > 0 ?
                    listaRegistros.map(registro => {
                        return (
                            <>
                                <div onClick={()=>navigate("/editar",{id:registro._id, tipo:registro.type})}>
                                    <span >{registro.date}</span>
                                    <em>{registro.description} </em>
                                    <b>{registro.value}</b>
                                </div>
                                <ion-icon onClick={() => removerRegistro(registro.id)} name="trash-outline"></ion-icon>

                            </>
                        )
                    })
                    :  <p>Não há registros de entrada ou saída</p>}

                <ion-icon name="close-outline"></ion-icon>
            </Registros>
            <Botoes>
                <button onClick={()=>navigate("/registrar",{state:{tipo:'entrada'}})}>
                    <ion-icon name="add-circle-outline"></ion-icon>

                    <p>Nova entrada</p>
                </button>
                <button onClick={()=>navigate("/registrar",{state:{tipo:'saída'}})}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova saída</p>
                </button>
            </Botoes>
        </>
    )
}

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
display: flex;
width: 326px;
min-height: 446px;
max-height: auto;
margin: 0 auto;
background: #FFFFFF;
border-radius: 5px;
p{
    width: 180px;
    height: 46px;
    margin: auto;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
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
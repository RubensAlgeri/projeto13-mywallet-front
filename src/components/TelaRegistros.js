import axios from "axios";
import styled from "styled-components";
import React from "react";
import { ThreeDots } from "react-loader-spinner"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReducer } from "react/cjs/react.production.min";

export default function TelaRegistros() {
    return (
        <>
            <Topo>
                <p>Olá, { }</p>
                <ion-icon name="log-out-outline"></ion-icon>
            </Topo>
            <Registros>
                <p>Não há registros de entrada ou saída</p>
                <ion-icon name="close-outline"></ion-icon>
            </Registros>
            <Botoes>
                <button>
                    <ion-icon name="add-circle-outline"></ion-icon>

                    <p>Nova entrada</p>
                </button>
                <button>
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
import axios from 'axios';
import styled from 'styled-components';
import React from 'react';
import {ThreeDots} from "react-loader-spinner"
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";

import UserContext from '../contexts/UserContext';

export default function TelaLogin(){
    const [login, setLogin] = useState({email: "", password:""})
    const {email, password} = login;
    const [carregando, setCarregando] = useState(false)
    const setUserData = useContext(UserContext).setUserData
    

    const navigate = useNavigate();


    function logar(event){
        setCarregando(true);
        event.preventDefault();
        const promessa = axios.post("", {email, password})
        promessa.then(resposta=>{
            setCarregando(false)
            setUserData({data: resposta.data, token: resposta.data.token})
            navigate("/hoje")
            
        })
        promessa.catch(err=>{
            setCarregando(false)
            alert(`deu ruim, ${err.response.data.message}`)
        })
    }

    return(
        <Login>
            <h1>MyWallet</h1>
            <form onSubmit={logar}>
                {carregando ?
                    <>
                        <input disabled type="email" placeholder="E-mail" ></input>
                        <input disabled type="password" placeholder="Senha"></input>
                        <button disabled><ThreeDots color="#FFFFFF" height={13} width={51}/></button>
                    </>
                    :
                    <>
                        <input type="email" placeholder="E-mail" value={login.email} onChange={(e)=>setLogin({email:e.target.value, password})} required></input>
                        <input type="password" placeholder="Senha" value={login.password} onChange={(e)=>setLogin({password:e.target.value, email})} required></input>
                        <button type="submit">Entrar</button>
                    </>
                }
            </form>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>

        </Login>
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
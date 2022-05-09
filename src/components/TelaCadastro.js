import axios from "axios";
import styled from "styled-components";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TelaCadastro() {
    const [cadastro, setCadastro] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
    });
    const { email, password, name, confirmPassword } = cadastro;

    const navigate = useNavigate();

    function cadastrar(event) {
        event.preventDefault();
        const promessa = axios.post(
            "https://projeto-13-mywallet.herokuapp.com/sign-up",
            { email, password, username: name }
        );
        promessa.then(() => {
            navigate("/");
        });
        promessa.catch((err) => {
            alert(`deu ruim, ${err}`);
        });
    }

    return (
        <Cadastro>
            <h1>MyWallet</h1>
            <form onSubmit={cadastrar}>

                <input
                    type="text"
                    placeholder="Nome"
                    value={cadastro.name}
                    onChange={(e) =>
                        setCadastro({ name: e.target.value, email, password, confirmPassword })
                    }
                    required
                ></input>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={cadastro.email}
                    onChange={(e) =>
                        setCadastro({ email: e.target.value, password, name, confirmPassword })
                    }
                    required
                ></input>
                <input
                    type="password"
                    placeholder="Senha"
                    value={cadastro.password}
                    onChange={(e) =>
                        setCadastro({ password: e.target.value, email, name, confirmPassword })
                    }
                    required
                ></input>
                <input
                    type="password"
                    placeholder="Confirme a senha"
                    value={cadastro.confirmPassword}
                    onChange={(e) =>
                        setCadastro({ confirmPassword: e.target.value, email, password, name })
                    }
                    required
                ></input>
                {password === confirmPassword ? (
                    <button type="submit">Cadastrar</button>
                ) : (
                    <button disabled type="submit">Cadastrar</button>
                )}

            </form>
            <Link to="/">Já tem uma conta? Faça login!</Link>
        </Cadastro>
    );
}
const Cadastro = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  h1 {
    margin: 95px 0 28px 0;
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    line-height: 50px;

    color: #FFFFFF;
  }
  form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 500px;
  }
  input {
    width: 303px;
    height: 45px;
    margin-bottom: 13px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;
  }
  button {
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 303px;
    height: 45px;
  }
`;
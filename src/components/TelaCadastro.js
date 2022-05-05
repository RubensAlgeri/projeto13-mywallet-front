import axios from "axios";
import styled from "styled-components";
import React from "react";
import {ThreeDots} from "react-loader-spinner"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TelaCadastro() {
    const [cadastro, setCadastro] = useState({
        email: "",
        password: "",
        name: "",
        password2: "",
    });
    const { email, password, name, password2 } = cadastro;
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    function cadastrar(event) {
        event.preventDefault();
        setCarregando(true);
        const promessa = axios.post(
            "",
            { email, password, name }
        );
        promessa.then(() => {
            setCarregando(false);
            navigate("/");
        });
        promessa.catch((err) => {
            setCarregando(false);
            alert(`deu ruim, ${err.response.data.message}`);
        });
    }

    return (
        <Cadastro>
            <h1>MyWallet</h1>
            <form onSubmit={cadastrar}>
                {carregando ? (
                    <>
                        <input
                            disabled
                            type="text"
                            placeholder="Nome"
                        ></input>
                        <input
                            disabled
                            type="email"
                            placeholder="E-mail"
                        ></input>
                        <input
                            disabled
                            type="password"
                            placeholder="Senha"
                        ></input>

                        <input
                            disabled
                            type="password"
                            placeholder="Confirme a senha"
                        ></input>

                        <button disabled>
                            <ThreeDots color="#FFFFFF" height={13} width={51} />
                        </button>
                    </>
                ) : (
                    <>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={cadastro.name}
                                onChange={(e) =>
                                    setCadastro({ name: e.target.value, email, password, password2 })
                                }
                                required
                            ></input>
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={cadastro.email}
                            onChange={(e) =>
                                setCadastro({ email: e.target.value, password, name, password2 })
                            }
                            required
                        ></input>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={cadastro.password}
                            onChange={(e) =>
                                setCadastro({ password: e.target.value, email, name, password2 })
                            }
                            required
                        ></input>
                        <input
                            type="password"
                            placeholder="Confirme a senha"
                            value={cadastro.password2}
                            onChange={(e) =>
                                setCadastro({ password2: e.target.value, email, password, name })
                            }
                            required
                        ></input>

                        <button type="submit">Cadastrar</button>
                    </>
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
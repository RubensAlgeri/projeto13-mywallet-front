import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Reset from "../themes/Reset";
import Style from "../themes/Style"

import UserContext from "../contexts/UserContext";
import TelaCadastro from "./TelaCadastro"
import TelaLogin from "./TelaLogin"
import TelaRegistros from "./TelaRegistros"
import TelaRegistrar from "./TelaRegistrar"
import TelaEditar from "./TelaEditar"


export default function App(){
	const [userData, setUserData] = React.useState([])
	const [porcentagem, setPorcentagem] = React.useState(0);
    return(
        <>
		<Reset />
        <Style />
			<BrowserRouter>
				<UserContext.Provider value={{ userData, setUserData, porcentagem, setPorcentagem}}>
					<Routes>
						<Route path="/" element={<TelaLogin />} />
						<Route path="/cadastro" element={<TelaCadastro />} />
						<Route path="/registros" element={<TelaRegistros />} />
						<Route path="/registrar" element={<TelaRegistrar />} />
						<Route path="/editar" element={<TelaEditar />} />
					</Routes>
				</UserContext.Provider>
			</BrowserRouter>
        </>
    );
}
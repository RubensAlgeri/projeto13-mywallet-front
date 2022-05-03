import { createGlobalStyle } from 'styled-components';

const Style = createGlobalStyle`
body{
    overflow-x: hidden;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    width: 100vw;
    height: 100vh;
    background: #8C11BE;
}
a{
    text-decoration: none;
    color: #FFFFFF;
}
input::placeholder{
    font-size: 20px;
    line-height: 23px;

    color: #000000;
}
input:disabled{
    background: #F2F2F2;
}
button{
    background: #A328D6;
    border: none;
}
button:disabled{
    opacity: 0.7;
}
`

export default Style;
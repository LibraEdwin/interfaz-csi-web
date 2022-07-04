import Sidebar from '../components/SideBar'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Api from "./../Api";
import '../css/menuPrincipal.css'

import '../config';

const registros = [
    { title: "Registro de cobranzas", link: "#"},
    { title: "Registro de notas de crédito", link: "/nota-de-credito"},
    { title: "Registro de financiamiento", link: "/financiamiento"},
    { title: "Anulación de comprobante", link: "#"},
]
export default class MenuPrincipal extends Component {

    state = {
        usuarioLogeado: ""
    };

    async componentDidMount(){
        const token = localStorage.getItem("token");
            if (token) {
                try {
                    const { body: usuario } = await Api.getData(
                        `${global.config.URI_API}/api-csi-service/loginTrabajadores/${token}`
                        );
                            this.setState({
                            usuarioLogeado: usuario.recordset[0],
                        });
                    } catch (error) {
            localStorage.removeItem("token");}
                }else {
                this.props.history.push("/");
            }
    }

    render() {
        return (
            <>
            <Sidebar nombreUsuario={this.state.usuarioLogeado.usuario} cargo={this.state.usuarioLogeado.cargo} />

            <div className="container">
                <p className="titulo">Módulo de cobranzas y caja</p>
                {
                    registros.map( registro => (
                            <Link to={registro.link} className="ojo" key={registro.title}>{registro.title}
                                <i className="material-icons small" style={{color:'black'}}>keyboard_arrow_right</i>
                            </Link>
                    ))
                }
            </div>
            </>
        )
    }
}

import React from 'react'
import { Link } from 'react-router-dom'
import '../css/sidebar.css'
import M from "materialize-css";
import logo from '../images/logo.png';




const sideData = [
	{
		icon: <i className="material-icons">account_box</i>,
		title: 'Módulo de socios',
		link: '/menu-principal'
	},
	{
		icon: <i className="material-icons">credit_card</i>,
		title: 'Modulo de cobranzas',
		link: '/menu-principal'
	},
	{
		icon: <i className="material-icons">assignment</i>,
		title: 'Modulo de reportes',
		link: '/modulo-reportes'
	},
	{
		icon: <i className="material-icons">exit_to_app</i>,
		title: 'Cerrar sesión',
		link: '/'
	}
];

export default function SideBar({nombreUsuario, cargo}) {

        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);


    return (
            <>
                <div>
                    <nav className="nav-wrapper white">
                        <Link to="/menu-principal" className="image-wrapper">
                           <img src={logo} alt="logo" className="brand-logo center valign-wrapper"/>
                        </Link>
                        <Link to="#" className="sidenav-trigger show-on-large" data-target="mobile-links">
                            <div className="icon-wrapper">
                            <i className="material-icons">menu</i>
                            </div>
                        </Link>
                        <Link to="/">
                            <div className="icon-wrapper right valign-wrapper">
                            <i className="material-icons" style={{paddingRight:"2rem"}}>account_circle</i>
                            </div>
                        </Link>
                    </nav>
                </div>
                <ul className="sidenav sidebarList" style={{color:'black'}} id="mobile-links">
                    <li>
                        <div className="avatar valign-wrapper">
                            <i className="material-icons white large circle" style={{color: "#C4C4C4", margin:20, width: 66, height: 66, fontSize: 66}}>person</i>

                            <div style={{display:"flex", flexDirection:"column"}}>
                                <span style={{fontSize: 20}}>{nombreUsuario}</span>
                                <span style={{fontSize: 12}}>{cargo}</span>
                            </div>

                        </div>
                    </li>
                    { sideData.map((val, key) => {
                        return (
                            <Link style={{color:"black"}}to={val.link} key={key}>
                                <li className="row"  >
                                    <div className="icon">{val.icon}</div>
                                    <p className="title">{val.title}</p>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </>
        )
}

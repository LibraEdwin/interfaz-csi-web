import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    return (
			// <nav className="nav-wrapper white">
			<nav className={`nav-wrapper white ${props.class}`}>
				<div className="titulo-navbar">
					<Link to={props.link}>
						<i className="material-icons">keyboard_backspace</i>
					</Link>
					<span style={{ color: 'black' }}>{props.name}</span>
					<Link to="#">
						<i className="material-icons" style={{ paddingRight: '2rem' }}>
							account_circle
						</i>
					</Link>
				</div>
			</nav>
		);

}

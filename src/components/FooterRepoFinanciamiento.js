import React from 'react'

export default function FooterRepoFinanciamiento({print, montoTotal}) {
    return (
        <footer className={`footer-reporte ${print}`}>
            <ul className="container reporte">
                <li>
                    Monto total:<b>{montoTotal}</b>
                </li>
            </ul>
        </footer>
    )
}

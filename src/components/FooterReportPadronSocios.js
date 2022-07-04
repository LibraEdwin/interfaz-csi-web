import React from 'react';

const FooterReportPadronSocio = ({ print,tipoDeSocio, totalSocio}) => {
	return (
		<footer className={`footer-reporte ${print}`}>
			<ul className="container reporte">
				<li>
					Cantidad de Socios {tipoDeSocio}:<b>{totalSocio}</b>
				</li>
			</ul>
		</footer>
	);
}

export default FooterReportPadronSocio;

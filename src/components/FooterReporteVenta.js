import React from 'react';

const FooterReporteVenta = ({totalIGV, montoTotal, totalAfecto, totalInafecto, print}) => {
    return (
			<footer className={`footer-reporte ${print}`}>
				<ul className="container reporte">
					<li>
						Total Afecto:<b>{totalAfecto}</b>
					</li>
					<li>
						Total Inafecto:<b>{totalInafecto}</b>
					</li>
					<li>
						Total IGV:<b>{totalIGV}</b>
					</li>
					<li>
						Monto total:<b>{montoTotal}</b>
					</li>
				</ul>
			</footer>
		);
}

export default FooterReporteVenta;

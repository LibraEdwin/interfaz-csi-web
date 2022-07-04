import React from 'react';
import DataList from '../components/DataList'
import SideBar from '../components/SideBar'

const ReporteCobranzas = () => {
    const data = [
			{ title: 'Reportes de ventas', link: '/reportes-ventas' },
			{ title: 'Reporte de conbranzas', link: '#' },
			{ title: 'Reporte de cobros de financiamiento', link: '/reporte-financiamiento'},
			{ title: 'Reporte de deudores', link: '/reporte-deudores'}

		];
    return (
			<>
				<SideBar />
				<DataList
					subtitleLink="Módulo de reportes"
					link="modulo-reportes"
					arrow="keyboard_arrow_right"
					subtitle2="Reportes de cobranzas y caja"
					data={data}
				/>
			</>
		);
}

export default ReporteCobranzas;

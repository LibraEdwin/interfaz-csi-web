import React from 'react';
import DataList from '../components/DataList'
import SideBar from '../components/SideBar';

const ModuloReportes = () => {
    const data = [
			{ title: 'Reportes de socios', link: '/reporte-socios' },
			{ title: 'Reportes de cobranzas y caja', link: '/reportes-cobranzas-caja' },
		];
    return (
        <>
            <SideBar/>
			<DataList subtitle1="Módulo de reportes" data={data} />
        </>
		);
}

export default ModuloReportes;

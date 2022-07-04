import React from 'react'
import DataList from '../components/DataList'
import SideBar from '../components/SideBar'


function ReporteSocios() {

    const data = [
        { title: 'Reporte padrón de socios', link: '/reporte-padron-socios' },
        { title: 'Reporte de socios para cambio de categoría', link: '/reporte-socios-cambio-categoria'},

    ];
    return (
        <>
            <SideBar />
            <DataList
                subtitleLink="Módulo de reportes"
                link="modulo-reportes"
                arrow="keyboard_arrow_right"
                subtitle2="Reportes de socios"
                data={data}
            />
        </>
    )
}

export default ReporteSocios

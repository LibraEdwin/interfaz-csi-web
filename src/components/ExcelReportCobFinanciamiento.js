import React from 'react'

import ReactExport from "react-export-excel"

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExcelReportCobFinanciamiento({data, active, theme}) {

    return (

        <ExcelFile element={
            <input
                className="btn-ventas w-full"
                type="button"
                value="EXPORTAR"
                disabled = {active}
                style={{background: theme}}
            /> 
        } filename="ReporteCobranzasFinanciamiento">

        <ExcelSheet data={data} name="cobros de financiamiento">
            <ExcelColumn label="Código" value="Cliente_ID"/>
            <ExcelColumn label="Apellidos y nombres" value="Nombres"/>
            <ExcelColumn label="Origen" value="nomcon"/>
            <ExcelColumn label="Cuota" value="cuota"/>
            <ExcelColumn label="Periodo" value="periodo"/>
            <ExcelColumn label="Fecha de cancelación" value="fechacance"/>
            <ExcelColumn label="Nro. recibo" value="nrorecibo"/>
            <ExcelColumn label="Monto" value="montodeuda"/>
        </ExcelSheet>
    </ExcelFile>

    )
}

import React from 'react'
import ReactExport from "react-export-excel"
import exportar from '../images/exportar.svg';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExcelReportPadronSocio({data, active}) {

    return (
      
        <ExcelFile element={
            <button className={active ? "exportar-disabled" : "exportar-btn"} disabled={active} >
                <img src={exportar} width="22" height="22" alt={"con-exportart"} disabled={"true"} />
                EXPORTAR
            </button>
           
        } filename="ReportePadronSocio">

        <ExcelSheet data={data} name="cobros de financiamiento">
            <ExcelColumn label="Nacimiento" value="Nacimiento"/>
            <ExcelColumn label="Cliente id" value="cliente_id"/>
            <ExcelColumn label="Origen" value="Origen"/>
            <ExcelColumn label="Categoria" value="Categoria"/>
            <ExcelColumn label="Estado" value="Estado"/>
            <ExcelColumn label="Nombres" value="Nombres"/>
            <ExcelColumn label="UP" value="UP"/>
            <ExcelColumn label="Direccion" value="Direccion"/>
            <ExcelColumn label="Distrito" value="Distrito"/>
            <ExcelColumn label="Codigo Postal" value="CodPostal"/>
            <ExcelColumn label="Email" value="email"/>
            <ExcelColumn label="Telefono" value="Telefono"/>
            <ExcelColumn label="Profesion" value="Profesion"/>
            <ExcelColumn label="Celular" value="celular"/>
            <ExcelColumn label="Sexo" value="sexo"/>
            <ExcelColumn label="Telefono" value="Telefono"/>
            <ExcelColumn label="Tipo Documento" value="Tipodoc_ID"/>
            <ExcelColumn label="Numero Documento" value="nrodoc"/>
            <ExcelColumn label="Fecha de ingreso" value="Ingreso"/>
        </ExcelSheet>
    </ExcelFile>
    )
}

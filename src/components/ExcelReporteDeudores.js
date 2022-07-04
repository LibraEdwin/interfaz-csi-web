import ReactExport from "react-export-excel"


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExcelReporteDeudores({ data, active, theme }) {

    return (

        <ExcelFile element={
            <input
                className="btn-ventas w-full"
                type="button"
                value="EXPORTAR"
                disabled={active}
                style={{ background: theme }}
            />
        } filename="Reporte de Deudores">

            <ExcelSheet data={data} name="reporte deudores ">
                <ExcelColumn label="Código" value="cliente_id" />
                <ExcelColumn label="Nombres" value="Nombres" />
                <ExcelColumn label="Origen" value="Origen" />
                <ExcelColumn label="Categoria" value="nomcate" />
                <ExcelColumn label="Cuota" value="cuotas" />
                <ExcelColumn label="Deuda" value="Monto Deuda" />
            </ExcelSheet>

        </ExcelFile>

    )
}

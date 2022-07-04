import ReactExport from "react-export-excel"


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExcelReporteVentas({ data, active, theme }) {

    return (

        <ExcelFile element={
            <input
                className="btn-ventas w-full"
                type="button"
                value="EXPORTAR"
                disabled={active}
                style={{ background: theme }}
            />
        } filename="Reporte Ventas">

            <ExcelSheet data={data} name="reporte ventas ">
                <ExcelColumn label="Tipo Comprobante" value="descrip" />
                <ExcelColumn label="Código" value="Numero" />
                <ExcelColumn label="Fecha" value="fechcomp" />
                <ExcelColumn label="Nombres" value="Nombres" />
                <ExcelColumn label="Venta" value={"Afecto" || "Inafecto" || 0.00} />
                <ExcelColumn label="IGV" value="IGV" />
                <ExcelColumn label="Total" value="Total" />
                <ExcelColumn label="Rubro" value="Rubro" />
                <ExcelColumn label="TC" value="TC" />
            </ExcelSheet>

        </ExcelFile>

    )
}

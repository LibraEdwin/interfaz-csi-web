import React from 'react'
import { dateFormat, currencyFormat} from '../utitlitario';


export default function TableRepoFinanciamiento({ reporteFinanciamiento }) {

    return (
        <table id="comprobante">
            <thead >
                <tr>
                    <th>Código</th>
                    <th>Apellidos y nombres</th>
                    <th>Origen</th>
                    <th>Cuota</th>
                    <th>Periodo</th>
                    <th>Monto</th>
                    <th>Fecha cancelación</th>
                    <th>Nro. Recibo</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.entries(reporteFinanciamiento).map(([key, value]) => {
                        
                      if (key === "detalles") {
                            return (value.map(reporte =>
                                <tr key={key.nrorecibo}>
                                    <td>{reporte.Cliente_ID}</td>
                                    <td>{reporte.Nombres}</td>
                                    <td>{reporte.nomcon}</td>
                                    <td>{reporte.cuota}</td>
                                    <td>{reporte.periodo}</td>
                                    <td>{reporte.montodeuda.toFixed(2)}</td>
                                    <td>{dateFormat(reporte.fechacance)}</td>
                                    <td>{reporte.nrorecibo}</td>
                                </tr>
                            ))
                        }

                        if( key === "total"){
                            return( 
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td style={{fontWeight: "bold"}}>Total</td>
                                    <td style={{fontWeight: "bold"}}>{currencyFormat(value.total)}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        }
                        return null

                    })
                    
                }

               
            </tbody>

        </table>
       
    )
}

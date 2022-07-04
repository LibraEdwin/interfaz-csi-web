import React from 'react'
import { dateFormat, currencyFormat } from '../utitlitario';


export default function TablaRepoVentas({ reportesVentas, afecto, inafecto, total, igv}) {

    return (
        <>
            { Object.entries(reportesVentas).map(([key, value]) => {
               
                return (
                    <div key={key}>
                        <table id="comprobante">
                            <thead >
                                <tr>
                                    <th>{key}</th>
                                    <th>Código</th>
                                    <th>Fecha</th>
                                    <th>Nombres</th>
                                    <th>Venta</th>
                                    <th>IGV</th>
                                    <th>Total</th>
                                    <th>Rubro</th>
                                    <th>TC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                value.detalles.map(reporte => {
                                    return (
                                        <tr key={reporte.Comprobante_id}>
                                            <td>{reporte.Numero}</td>
                                            <td>{reporte.cliente_id}</td>
                                            <td>{dateFormat(reporte.fechcomp)}</td>
                                            <td>{reporte.Nombres}</td>
                                            <td>{reporte.Afecto.toFixed(2) || reporte.Inafecto.toFixed(2) || 0.00}</td>
                                            <td>{reporte.IGV.toFixed(2)}</td>
                                            <td>{reporte.Total.toFixed(2)}</td>
                                            <td>{reporte.Rubro}</td>
                                            <td>{reporte.TC}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <table id="comprobante">
                            <thead>
                                <tr className="resumen-title">
                                    <th >{value.totales.descrip}</th>
                                    <th>Afecto</th>
                                    <th>Inafecto</th>
                                    <th>IGV</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="resumen-title">
                                    <td></td>
                                    <td>{currencyFormat(value.totales.totalAfecto)}</td>
                                    <td>{currencyFormat(value.totales.totalInafecto)}</td>
                                    <td>{currencyFormat(value.totales.totalIGV)}</td>
                                    <td>{currencyFormat(value.totales.totalTotal)}</td>
                                </tr>
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>
                )
            })}
            <table id="comprobante">
                            <thead>
                                <tr className="resumen-title">
                                    <th >RESUMEN GENERAL</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr className="resumen-title">
                                    <th></th>
                                    <th>Afecto</th>
                                    <th>Inafecto</th>
                                    <th>IGV</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="resumen-title">
                                    <td></td>
                                    <td>{afecto}</td>
                                    <td>{inafecto}</td>
                                    <td>{igv}</td>
                                    <td>{total}</td>
                                    
                                </tr>
                            </tbody>
                        </table>
        </>
    )
}

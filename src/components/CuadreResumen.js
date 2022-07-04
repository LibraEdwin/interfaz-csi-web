import React from 'react'
import {formatToSoles, formatToDolares} from '../utitlitario';

export default function CuadreResumen({ cuadreResumen, totalSoles, totalDolares}) {
    return (
        <table id="comprobante">
            <thead>
                <tr className="resumen-title">
                    <th>CUADRE GENERAL (*)</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr className="resumen-title">
                    <th></th>
                    <th>Ingreso</th>
                    <th>Soles</th>
                    <th>Dólares</th>
                </tr>
            </thead>
            <tbody>
                {cuadreResumen.map(cuadre =>
                    <tr key={cuadre.descrip} className="resumen-title">
                        <td></td>
                        <td>{cuadre.descrip}</td>
                        <td>{formatToSoles(cuadre.Soles)}</td>
                        <td>{cuadre.Dolares || formatToDolares(0) } </td>
                    </tr>
                )}
                <tr className="resumen-title">
                    <td></td>
                    <td></td>
                    <td style={{background: "#F8F8F8"}}>{formatToSoles(totalSoles)}</td>
                    <td style={{background: "#F8F8F8"}}>{formatToDolares(totalDolares)}</td>
                </tr>
                <tr className="resumen-title">
                    <td></td>
                    <td className="total-general">Total general </td>
                    <td  className="total-general"style={{textAlign: "right"}}>{formatToSoles(totalSoles)}</td>
                    <td className="total-general"></td> 
                </tr>
            </tbody>
        </table>
    )
}

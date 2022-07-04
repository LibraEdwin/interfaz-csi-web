import React from 'react'

export default function TableDeudores({ deudores }) {
    return (
        <table id="comprobante">
            <thead>
                <tr>
                    <th>CODIGO</th>
                    <th>NOMBRES</th>
                    <th>ORIGEN</th>
                    <th>CATEGORIA</th>
                    <th>CUOTA</th>
                    <th>DEUDA</th>
                </tr>
            </thead>
            <tbody>
                {deudores?.map(deudor => {
                    return (
                    <tr key={deudor.CuentaCorriente_ID}>
                        <td>{deudor.cliente_id}</td>
                        <td>{deudor.Nombres}</td>
                        <td>{deudor.Origen}</td>
                        <td>{deudor.nomcate}</td>
                        <td>{deudor.cuotas}</td>
                        <td>{deudor["Monto Deuda"]}</td>
                    </tr>)
                })}
            </tbody>
        </table>
    )
}

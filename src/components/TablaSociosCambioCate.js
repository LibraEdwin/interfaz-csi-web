import React from 'react'

export default function TablaRepoPadronSocios({ socios }) {
    return (
        <table id="comprobante">
            <thead>
                <tr>
                    <th>FECHA DE INGRESO</th>
                    <th>NACIMIENTO</th>
                    <th>CODIGO</th>
                    <th>NOMBRES</th>
                    <th>ORIGEN</th>
                    <th>CATEGORIA</th>
                </tr>
            </thead>
            <tbody>
                {socios?.map((socio, index) => {
                    return (
                        <>
                            <tr key={index} className="row-month">
                                <td>{socio.month}</td>
                                <td ></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {
                                socio.data.map(sd => {
                                    return (
                                        <>
                                            <tr key={sd.cliente_id}>
                                                <td>{sd.FechaIngreso}</td>
                                                <td>{sd.Nacimiento}</td>
                                                <td>{sd.cliente_id}</td>
                                                <td>{sd.Nombres}</td>
                                                <td>{sd.Origen}</td>
                                                <td>{sd.Categoria}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </>
                    )
                })}
            </tbody>
        </table>
    )
}

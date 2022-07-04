import React from 'react'

export default function TablaRepoPadronSocios({socios}) {
    return (
        <table id="comprobante">
        <thead>
            <tr>
                <th>CODIGO</th>
                <th>ORIGEN</th>
                <th>CATEGORIA</th>
                <th>ESTADO</th>
                <th>NOMBRES</th>
                <th>UP</th>
            </tr>
        </thead>
        <tbody>
            {socios?.map(socio => {
                return (
                <tr key={socio.cliente_id}>
                    <td>{socio.cliente_id}</td>
                    <td>{socio.Origen}</td>
                    <td>{socio.Categoria}</td>
                    <td>{socio.Estado}</td>
                    <td>{socio.Nombres}</td>
                    <td>{socio.UP}</td> 
                </tr>)
            })}
        </tbody>
    </table>
    )
}

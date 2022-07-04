
import React, { Fragment } from 'react'

const DetaCuenta = (props) => {

    return (
      <Fragment>
          <table className="table-responsive table-detaCuenta">
            <thead>
              <tr>
                <th className="center"></th>
                <th className="center">Cuota</th>
                <th className="center">Periodo</th>
                <th className="center">Vencimiento</th>
                <th className="center">Monto</th>
              </tr>
            </thead>

            <tbody>
              {

                props.cuotas !== null && (

                        props.cuotas.map((data, index) => {

                            return (
                            <tr key={index}>
                                <td className="center">
                                <p>
                                    <label>
                                    {data.estado ? <input name={index} type="checkbox" disabled defaultChecked={true} />
                                        : <input name={index} type="checkbox" disabled />
                                      }
                                    <span></span>
                                    </label>
                                </p>
                                </td>
                                <td className="center">{data.cuota} </td>
                                <td className="center">{data.periodo} </td>
                                <td className="center">{data.fechavenci.substring(0,10)} </td>
                                <td className="center">{data.montodeuda} </td>
                            </tr>
                            )

                        })
                )

              }
            </tbody>
          </table>
      </Fragment>
    );
  };
  
  export default DetaCuenta;
  

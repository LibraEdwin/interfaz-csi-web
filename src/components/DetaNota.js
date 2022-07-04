import React, { Fragment } from "react";

const DetaNota = (props) => {

  const seleccionarId = (id) => {
    props.eliminarFila(id)
  }

  return (
    <Fragment>
      <div className="tabla px-3">
        <table className="table-responsive centered">
          <thead>
            <tr>
              <th >Id</th>
              <th >Concepto</th>
              <th >IGV</th>
              <th >Monto</th>
              <th ></th>
            </tr>
          </thead>
          <tbody>
            {props.tabla !== null &&
              props.tabla.map((data, index) => {
                let igv = (data.importe * 0.18) / 1.18
                
                return (
                  <tr key={index} >
                    <td >{data.ConceptoCobro_ID} </td>
                    <td >{data.nomcobro}</td>
                    <td >{data.ConceptoCobro_ID === 1 ? 0 : igv.toFixed(2)}</td>
                    <td >{data.importe}</td>
                    <td >
                      <button
                        className="btn waves-effect waves-light red darken-1"
                        type="submit"
                        name="action"
                        onClick= {() => seleccionarId(data.ConceptoCobro_ID)}
                      >
                        Eliminar
                        <i className="material-icons left">delete_forever</i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default DetaNota;

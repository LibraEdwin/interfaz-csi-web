import React, { Component, Fragment } from "react";
import Navbar from "../components/Navbar";
import M from "materialize-css";

import DetaCuenta from "../components/DetaCuenta";
import Api from "./../Api";

import '../config';

export default class Financiamiento extends Component {
  state = {
    usuario: null,
    usuarios: null,
    buscador: null,
    meses: 0,
    cuotas: 0,
    total: 0,
    mensual: 0,
    boletas: [],
    financiamiento: [],
    footer: false,
    tabla: null,
    nuevoDetaCuenta: null,
    codigo: "",
  };

  //funcion para agregar el usuario actual
  handleSeleccionarUsuario = async (us) => {
    // document.querySelector('#codigo').value = ''

    // Cargado de datos generales del socio //
    await this.setState({
      usuario: us,
      meses: 0,
      cuotas: 0,
      total: 0,
      mensual: 0,
      boletas: [],
      footer: false,
      buscador: null,
      tabla: null,
      nuevoDetaCuenta: [],
    });
    this.setState({
      codigo: us.codigo,
    });
    // this.setState((prevState) => ({
    //       usuario: {
    //         ...prevState.usuario,
    //         codigo: us.codigo
    //       },
    //     }));

    document.querySelector("#buscador").value = "";
    M.Modal.getInstance(document.querySelector(".modal")).close();

    // Cargado de detalle de cuenta //

    const {
      body: { recordset: cuenta },
    } = await Api.getData(
      `${global.config.URI_API}/api-csi-service/DetalleCuenta?id=${this.state.usuario.codigo}`
    );

    // Asignar nuevo campo a la tabla cuenta ..//

    if (this.state.usuario && cuenta.length > 0) {
      const datos = cuenta.map((data) => {
        data.estado = false;
        return data;
      });

      this.setState({
        footer: true,
        tabla: datos,
      });
    }
  };

  //funcion para seleccionar detalle de cuenta

  handleSeleccionarDetalle = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    const meses = e.target.value;
    //validar si hay usuario y datos en datatable
    if (this.state.usuario && this.state.tabla && this.state.tabla.length > 0) {
      //reiniciar estado de datatabla
      const datosInicio = this.state.tabla.map((data) => {
        data.estado = false;
        return data;
      });
      //convertir a true depende de los meses seleccionados
      let conta = 1;
      const datosFinal = datosInicio.map((data) => {
        if (conta <= meses) {
          data.estado = true;
          conta++;
        }

        return data;
      });
      //variable que contiene las boletas con estado true
      const boletas = datosFinal.filter((data) => data.estado);
      //sumar los montos que contiene el arreglo boletas
      let total = 0
      boletas.forEach(data => {
        total+=data.saldo
      })

      //verificar si los inputs son más que 0
      if (parseInt(total) > 0 && parseInt(this.state.cuotas) > 0) {
        const mensual = total / this.state.cuotas;
        this.setState({
          mensual: mensual.toFixed(2),
        });
      } else {
        this.setState({
          mensual: 0,
        });
      }

      // this.setState((prevState) => ({
      //   usuario: {
      //     ...prevState.usuario,
      //     detalleCuenta: datosFinal,
      //   },
      // }));

      //llenar campos
      await this.setState({
        total: total,
        boletas,
        tabla: null,
      });
      this.setState({
        tabla: datosFinal
      })
      // console.log(datosFinal)
    }
  };

  handleSeleccionarCuotas = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });

    if (this.state.usuario && this.state.tabla && this.state.tabla.length > 0) {
      const cuotas = e.target.value;
      // const datoMonto = this.state.tabla.filter((data) => data.estado);
      // const total = datoMonto.length * this.state.tabla[0].montodeuda;
      //sumar los montos que contiene el arreglo boletas
      let total = 0
      this.state.boletas.forEach(data => {
        total+=data.saldo
      })


      if (parseInt(this.state.total) > 0 && parseInt(this.state.cuotas) > 0) {

        const mensual = total / cuotas;
        this.setState({
          mensual: mensual.toFixed(2),
        });
      } else {
        this.setState({
          mensual: 0,
        });
      }

      // console.log(nuevoDetaCuenta)
    }
  };

  handleSubmit = async (e) => {
    // e.preventDefault();

    if (
      this.state.usuario !== null &&
      this.state.meses > 0 &&
      this.state.cuotas > 0 &&
      this.state.tabla.length > 0
    ) {
      let cuota = 1,
        cuotaVal = 1,
        annoInicial = 2021,
        diaInicial = 11,
        mesInicial = 2;
      const nuevoDetaCuenta = [];

      while (cuota <= this.state.cuotas) {
        if (mesInicial < 10) {
          mesInicial = `0${mesInicial}`;
        }

        nuevoDetaCuenta.push({
          cuota: cuotaVal,
          periodo: annoInicial,
          fechavenci: `${annoInicial}-${mesInicial}-${diaInicial}`,
          montodeuda: this.state.mensual,
        });

        cuota++;
        cuotaVal++;
        mesInicial++;
        if (mesInicial > 12) {
          mesInicial = 1;
          cuotaVal = 1;
          annoInicial++;
        }
      }
      await this.setState({
        nuevoDetaCuenta: nuevoDetaCuenta,
      });

      // console.log(this.state.nuevoDetaCuenta);

      // const form = new FormData(document.querySelector('form'))
      // for (const key of form.keys()) {
      //   console.log(`${key} -> ${form.get(key)}`)
      // }

      /*
       */

      for (const item of this.state.nuevoDetaCuenta) {
        // console.log(item.cuota);
        const form = new FormData();

        form.append("codigo", this.state.codigo);
        form.append("cuota", item.cuota);
        form.append("periodo", item.periodo);
        form.append("fechavenci", item.fechavenci);
        form.append("montodeuda", item.montodeuda);

        await Api.postData(
          `${global.config.URI_API}/api-csi-service/DetalleCuenta`,
          form
        );
      }

      for (const element of this.state.boletas) {
        // console.log(element.CuentaCorriente_ID);

        const formCuenta = new FormData();
        formCuenta.append("cuota", element.cuota);
        formCuenta.append("periodo", element.periodo);

        await Api.patchData(
          `${global.config.URI_API}/api-csi-service/estadocuenta/` +
            element.CuentaCorriente_ID,
          formCuenta
        );
      }

      this.setState({
        financiamiento: {
          usuario: this.state.usuario,
          boletas: this.state.boletas,
          total: this.state.total,
          cuotas: this.state.cuotas,
          mensual: this.state.mensual,
          meses: this.state.meses,
        },
      });
      this.setState({
        meses: 0,
        cuotas: 0,
        total: 0,
        mensual: 0,
        boletas: [],
        usuario: null,
        tabla: null,
        codigo: "",
      });
      alert("Financiamiento terminado");
    } else {
      alert("Financiamiento incompleto");
    }
  };
  handleFiltrarUsuario = (e) => {
    const datos = this.state.usuarios.filter(
      (data) =>
        data.Nombres !== null &&
        data.Nombres.includes(e.target.value.toUpperCase())
    );

    this.setState({ buscador: datos.slice(0, 50) });
    // console.log(datos.slice(0,50))
  };

  handleBuscarCodigo = async (e) => {
    if (e.key === "Enter") {
      // alert("alert")
      const datos = await this.state.usuarios.filter(
        (data) => data.codigo !== null && data.codigo === e.target.value
      );

      if (datos.length > 0) {
        this.setState({
          usuario: datos[0],
          meses: 0,
          cuotas: 0,
          total: 0,
          mensual: 0,
          boletas: [],
          footer: false,
          buscador: null,
          tabla: null,
        });
        const {
          body: { recordset: cuenta },
        } = await Api.getData(
          `${global.config.URI_API}/api-csi-service/DetalleCuenta?id=${this.state.usuario.codigo}`
        );

        // Asignar nuevo campo a la tabla cuenta ..//

        if (this.state.usuario && cuenta.length > 0) {
          const datos = cuenta.map((data) => {
            data.estado = false;
            return data;
          });

          this.setState({
            footer: true,
            tabla: datos,
          });
        }
      } else {
        alert("codigo no encontrado");
      }
    }
  };
  handleChangeCodigo = (e) => {
    this.setState({
      codigo: e.target.value,
    });
  };

  async componentDidMount() {
    const elems = document.querySelectorAll(".modal");
    M.Modal.init(elems);

    const {
      body: { recordset: datos },
    } = await Api.getData(`${global.config.URI_API}/api-csi-service/socio`);
    this.setState({ usuarios: datos });

    //leer token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { body: usuario } = await Api.getData(
          `${global.config.URI_API}/api-csi-service/loginTrabajadores/${token}`
        );
        this.setState({
          usuarioLogeado: usuario.recordset[0],
        });
      } catch (error) {
        localStorage.removeItem("token");
      }
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Fragment>
        <Navbar name="Registro de financiamiento" link="/menu-principal" />
        <form action="">
          <div className="container">
            <section>
              <div className="row">
                <div className="input-field col s12 m4">
                  <i data-target="modal1" className="material-icons icon-input">
                    keyboard
                  </i>
                  <input
                    id="codigo"
                    name="codigo"
                    type="text"
                    className="validate"
                    placeholder="Ingresa un código"
                    onKeyDown={this.handleBuscarCodigo}
                    onChange={this.handleChangeCodigo}
                    value={this.state.codigo}
                  />
                  <label className="active" htmlFor="codigo">
                    Código de socio
                  </label>
                </div>

                <div className="input-field col s12 m8">
                  <i
                    data-target="modal1"
                    className="material-icons icon-input modal-trigger cursor-pointer"
                  >
                    search
                  </i>
                  <input
                    placeholder=""
                    id="nombre"
                    name="nombre"
                    type="text"
                    className="validate "
                    defaultValue={
                      this.state.usuario ? this.state.usuario.Nombres : ""
                    }
                    disabled
                  />
                  <label className="active" htmlFor="comprobante">
                    Nombre de cliente
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12 m3">
                  <input
                    placeholder=""
                    id="origen"
                    name="origen"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.state.usuario ? this.state.usuario.origen : ""
                    }
                    disabled
                  />
                  <label className="active" htmlFor="socio">
                    Origen
                  </label>
                </div>

                <div className="input-field col s12 m3">
                  <input
                    placeholder=""
                    id="categoria"
                    name="categoria"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.state.usuario ? this.state.usuario.categoria : ""
                    }
                    disabled
                  />
                  <label className="active" htmlFor="nombre">
                    Categoría
                  </label>
                </div>

                <div className="input-field col s12 m3">
                  <input
                    placeholder=""
                    id="estado"
                    name="estado"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.state.usuario ? this.state.usuario.estado : ""
                    }
                    disabled
                  />
                  <label className="active" htmlFor="estado">
                    Estado
                  </label>
                </div>

                <div className="input-field col s12 m3">
                  <input
                    placeholder=""
                    id="dni"
                    name="dni"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.state.usuario ? this.state.usuario.DNI : ""
                    }
                    disabled
                  />
                  <label className="active" htmlFor="dni">
                    DNI
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12 m3">
                  <input
                    type="number"
                    id="meses"
                    name="meses"
                    className="validate"
                    placeholder=""
                    min="0"
                    max={this.state.tabla ? this.state.tabla.length : "10"}
                    onInput={this.handleSeleccionarDetalle}
                    value={this.state.meses || 0}
                  />
                  <label className="active" htmlFor="meses">
                    Seleccionar meses
                  </label>
                </div>
                <div className="input-field col s12 m3">
                  <input
                    type="number"
                    id="cuotas"
                    name="cuotas"
                    min="0"
                    max="24"
                    className="validate"
                    placeholder=""
                    onChange={this.handleSeleccionarCuotas}
                    value={this.state.cuotas || 0}
                  />
                  <label className="active" htmlFor="cuotas">
                    Cantidad de cuotas
                  </label>
                </div>
              </div>

              <div>
                <DetaCuenta
                  cuotas={this.state.tabla ? this.state.tabla : null}
                />
              </div>

              <div id="modal1" className="modal redondeado">
                <div className="modal-content">
                  <div className="input-field col s12 m8">
                    <i className="material-icons icon-input cursor-pointer">
                      keyboard
                    </i>
                    <input
                      placeholder="Haz una busqueda por nombres"
                      id="buscador"
                      name="buscador"
                      type="text"
                      className="validate "
                      onChange={this.handleFiltrarUsuario}
                      defaultValue={""}
                    />
                  </div>
                  <div className="tabla-modal">
                    <table className="table-responsive highlight">
                      <thead>
                        <tr>
                          <th className="center">Código</th>
                          <th className="center">Apellidos y nombres</th>
                          <th className="center">Origen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.buscador
                          ? this.state.buscador.map((usuario, index) => {
                              return (
                                <tr
                                  key={index}
                                  onClick={() =>
                                    this.handleSeleccionarUsuario(usuario)
                                  }
                                >
                                  <td className="center">{usuario.codigo} </td>
                                  <td className="center">{usuario.Nombres} </td>
                                  <td className="center">{usuario.origen} </td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer border-t">
                  <a
                    href="#!"
                    className="modal-close waves-effect waves-green btn-flat"
                  >
                    Aceptar
                  </a>
                </div>
              </div>
            </section>
          </div>
          {this.state.footer ? (
            <footer
              className="fixed2 fixed row bottom-0 w-full z-10"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <div className="col l2"></div>
              <div className="col l2">Monto total S/: {this.state.total}</div>
              <div className="col l2">Fracción {this.state.cuotas}</div>
              <div className="col l2">Mensual {this.state.mensual}</div>
              <div className="col l2">
                <button
                  onClick={this.handleSubmit}
                  type="button"
                  className="flex-1 btn waves-effect waves-light light-blue darken-4 redondeado btn-footer"
                >
                  Fraccionar
                </button>
              </div>

              {/* <div className="text-center">
                <p className="">Monto total S/:</p>
                <p className="">{this.state.total}</p>
                <p className="">Fracción</p>
                <p className="">{this.state.cuotas}</p>
                <p className="">Mensual</p>
                <p className="">
                  {this.state.mensual}
                </p>
                <div>
                  <button
                    onClick={this.handleSubmit}
                    type="button"
                    className="flex-1 btn waves-effect waves-light light-blue darken-4 redondeado btn-footer"
                  >
                    Fraccionar
                  </button>
                </div>
              </div> */}
            </footer>
          ) : null}
        </form>
      </Fragment>
    );
  }
}

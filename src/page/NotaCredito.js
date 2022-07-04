import React, { Component, Fragment } from "react";
import DetaNota from "../components/DetaNota";
import Navbar from '../components/Navbar'
// import FooterNota from "../components/FooterNota";

import '../css/notaCredito.css'
import M from "materialize-css";
import Swal from "sweetalert2";

import '../config';

import Api from "./../Api";

export default class NotaCredito extends Component {
  state = {
    tipoComprobante: "",
    tipoCobro: "",
    tipoEstado: "",
    nroComprobante: "",
    comprobante: null,
    detaComprobante: null,
    errorComprobante: false,
    footerIgv: 0,
    footerMonto: 0,
    btnRegistrar: true,
    mostrarInputs: true
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  buscarBoleta = async () => {
    const {
      body: { recordset: data },
    } = await Api.getData(
      `${global.config.URI_API}/api-csi-service/boleta?id=${this.state.nroComprobante}`
    );
    if (data.length > 0) {
      this.setState({ comprobante_id: data[0].Comprobante_ID });
    } else {
      this.setState({ errorComprobante: true });
    }
  };

  buscarFactura = async () => {
    const {
      body: { recordset: data },
    } = await Api.getData(
      `${global.config.URI_API}/api-csi-service/factura?id=${this.state.nroComprobante}`
    );
    if (data.length > 0) {
      this.setState({ comprobante_id: data[0].Comprobante_ID });
    } else {
      this.setState({ errorComprobante: true });
    }
  };

  buscarComprobante = async () => {
    const {
      body: { recordset: comprobante }
    } = await Api.getData(
      `${global.config.URI_API}/api-csi-service/comprobante?id=${this.state.comprobante_id}&tipoDoc=${this.state.tipoComprobante}`
    );
    if (comprobante.length > 0) {
      await this.setState({ comprobante: comprobante[0] });
      const fecha = new Date(this.state.comprobante.fechaEmision);
      const fecha2 = new Date(this.state.comprobante.fechaCancelacion);
      this.setState({
        fechaEmision:
          fecha.getUTCDate().toString().padStart(2, "0") +
          "/" +
          (fecha.getUTCMonth() + 1).toString().padStart(2, "0") +
          "/" +
          fecha.getUTCFullYear(),
        fechaCancelacion:
          fecha2.getUTCDate().toString().padStart(2, "0") +
          "/" +
          (fecha2.getUTCMonth() + 1).toString().padStart(2, "0") +
          "/" +
          fecha2.getUTCFullYear(),
      });
    } else {
      this.setState({
        comprobante: null,
        fechaEmision: "",
        fechaCancelacion: "",
        btnRegistrar: false
      });
      Swal.fire({
        icon: "warning",
        title: `Comprobante sin datos`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  buscarDetaComprobante = async () => {
    const {
      body: { recordset: detaComprobante },
    } = await Api.getData(
      `${global.config.URI_API}/api-csi-service/detaComprobante?id=${this.state.comprobante_id}`
    );
    this.setState({
      detaComprobante: detaComprobante,
    });
    if (detaComprobante.length > 0) {
      await this.setState({
        footerMonto: 0,
        footerIgv: 0,
      });
      detaComprobante.map((data) => {
        let igv = (data.importe * 0.18) / 1.18;
        return this.setState({
          footerMonto: this.state.footerMonto + data.importe,
          footerIgv: data.ConceptoCobro_ID === 1 ? this.state.footerIgv + 0 : this.state.footerIgv + igv,
        });
      });
    } else {
      this.setState({
        detaComprobante: null,
      });
    }
  };

  handleEnter = async (e) => {
    if (e.key === "Enter") {
      //validar campos diferente a vacios
      if (
        this.state.nroComprobante !== "" &&
        this.state.tipoComprobante !== ""
      ) {
        //habilitar btnregistrar y limpiar states
        await this.setState({
          btnRegistrar: true,
          notaCreditoId: "",
          tipoCobro: "",
          tipoEstado: ""
        })
        //reiniciar errorComprobante
        await this.setState({ errorComprobante: false });
        //verificar que sea boleta
        if (this.state.tipoComprobante === "1") {
          //input origen y estado
          this.setState({ mostrarInputs: true })
          //data boleta
          await this.buscarBoleta();
          // verificar si existe la boleta
          if (!this.state.errorComprobante) {
            //extraer datos dueño del comprobante
            await this.buscarComprobante();
            //extraer datos detaComprobante
            await this.buscarDetaComprobante();
          } else {
            Swal.fire({
              icon: "warning",
              title: "Número de boleta no existe",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } else if (this.state.tipoComprobante === "2") {
          //input origen y estado
          this.setState({ mostrarInputs: false })
          //data factura
          await this.buscarFactura();
          // verificar si existe la boleta
          if (!this.state.errorComprobante) {
            //extraer datos dueño del comprobante
            await this.buscarComprobante();
            //extraer datos detaComprobante
            await this.buscarDetaComprobante();
          } else {
            Swal.fire({
              icon: "warning",
              title: "Número de factura no existe",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
    }
  };
  eliminarFila = async (id) => {
    const nuevoDetaComprobante = this.state.detaComprobante.filter(
      (data) => data.ConceptoCobro_ID !== id
    );
    this.setState({
      detaComprobante: nuevoDetaComprobante,
    });
    if (nuevoDetaComprobante.length > 0) {
      await this.setState({
        footerMonto: 0,
        footerIgv: 0,
      });
      nuevoDetaComprobante.map((data) => {
        let igv = (data.importe * 0.18) / 1.18;
        return this.setState({
          footerMonto: this.state.footerMonto + data.importe,
          footerIgv: this.state.footerIgv + igv,
        });
      });
    } else {
      this.setState({
        footerMonto: 0,
        footerIgv: 0,
      });
    }
    // console.log(nuevoDetaComprobante)
  };

  agregarComprobante = async () => {
    const form = new FormData();

    form.append("Cliente_ID", this.state.comprobante.codigoCliente);
    form.append("igv", this.state.footerIgv);
    form.append("total", this.state.footerMonto);
    form.append("EstadoComprobante_ID", this.state.tipoEstado);
    form.append("TipoCobro_id", this.state.tipoCobro);

    const { body: nuevoComprobanteId } = await Api.postData(
      `${global.config.URI_API}/api-csi-service/comprobante`,
      form
    );
    // console.log(nuevoComprobanteId)
    this.setState({
      nuevoComprobanteId: nuevoComprobanteId.recordset[0].identity,
    });
  };

  agregarDetaComprobante = async () => {
    for (const item of this.state.detaComprobante) {
      console.log(item.cuota);
      const form = new FormData();

      form.append("Comprobante_ID", this.state.nuevoComprobanteId);
      form.append("ConceptoCobro_ID", item.ConceptoCobro_ID);
      form.append("cantidad", item.cantidad);
      form.append("importe", item.importe);
      form.append("observa", item.observa);

      await Api.postData(
        `${global.config.URI_API}/api-csi-service/detaComprobante`,
        form
      );
    }
  };

  agregarNotaCredito = async () => {
    if (this.state.tipoComprobante === "1") {
      this.setState({
        docRef: 3,
      });
    } else {
      this.setState({
        docRef: 1,
      });
    }
    const form = new FormData();

    form.append("Comprobante_id", this.state.nuevoComprobanteId);
    form.append("subtotal", this.state.footerMonto);
    form.append("igv", this.state.footerIgv);
    form.append("NumRef", this.state.nroComprobante);
    form.append("DocRef", this.state.docRef);

    const { body: data } = await Api.postData(
      `${global.config.URI_API}/api-csi-service/notaCredito`,
      form
    );
    // console.log(data)
    this.setState({
      notaCreditoId: data.recordset[0].numnota
    })
  };

  actualizarDetaCuenta = async () => {
    await Api.patchData(
      `${global.config.URI_API}/api-csi-service/notaCredito/${this.state.comprobante_id}`
    );
  };

  handleSubmit = async () => {

    if (this.state.tipoEstado !== "" && this.state.tipoCobro !== "") {
      if (this.state.detaComprobante.length > 0) {
        //desabilitar btnregistrar
        await this.setState({
          btnRegistrar: false
        })
        //agregar comprobante
        await this.agregarComprobante();
        //agregar detaComprobante
        this.agregarDetaComprobante();
        //update detaCuenta
        this.actualizarDetaCuenta();
        //agregar notaCredito
        await this.agregarNotaCredito();
        //alert
        Swal.fire({
          icon: "success",
          title: `Se registró nota de crédito: ${this.state.notaCreditoId}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: `No existe detalle de Comprobante`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: `Falta completar estado de comprobante y/o tipo de devolución`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  async componentDidMount() {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
    //get tipo comprobantes
    const {
      body: { recordset: tipoComprobantes },
    } = await Api.getData(
      `${global.config.URI_API}/api-csi-service/tipoComprobante`
    );
    this.setState({ tipoComprobantes: tipoComprobantes });
    //get tipo cobros
    const {
      body: { recordset: tipoCobros },
    } = await Api.getData(`${global.config.URI_API}/api-csi-service/tipoCobro`);
    this.setState({ tipoCobros: tipoCobros });

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
  componentDidUpdate() {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }
  render() {
    return (
      <Fragment>
        <Navbar name="Registro de nota de crédito" link="/menu-principal" />
        <section className="container formulario">
          <div className="row label1">
            <div className="input-field col s12 m4 ">
              <input
                placeholder=""
                disabled
                id="codigo"
                name="codigo"
                type="text"
                className="validate white center-align font-bold"
                value={this.state.notaCreditoId ? this.state.notaCreditoId : ""}
              />
              <label className="active" htmlFor="codigo">
                Nota de crédito
              </label>
            </div>

            <div className="input-field col s12 m4 ">
              <select
                value={this.state.tipoComprobante}
                name="tipoComprobante"
                id="tipoComprobante"
                onChange={this.onChange}
              >
                <option value="" disabled>
                  --Tipo de comprobante--
                </option>
                {this.state.tipoComprobantes
                  ? this.state.tipoComprobantes.map((data) => {
                    return (
                      <option
                        key={data.TipoComprobante_id}
                        value={data.TipoComprobante_id}
                      >
                        {data.descrip}
                      </option>
                    );
                  })
                  : null}
              </select>
              <label className="active" htmlFor="tipoComprobante">
                Tipo de Comprobante
              </label>
            </div>

            <div className="input-field col s12 m4 ">
              <input
                placeholder="Escriba un número de comprobante"
                id="nroComprobante"
                name="nroComprobante"
                type="number"
                className="validate w100 num"
                onKeyDown={this.handleEnter}
                onChange={this.onChange}
                value={this.state.nroComprobante}
              />
              <label className="active" htmlFor="nroComprobante">
                Número de comprobante
              </label>
            </div>
          </div>
          <div className="row label2">
            <div className="input-field col s12 m3 ">
              <input
                placeholder=""
                id="socio"
                name="socio"
                type="text"
                className="validate nobor"
                value={
                  this.state.comprobante
                    ? this.state.comprobante.codigoCliente
                    : ""
                }
                disabled
              />
              <label className="active" htmlFor="socio">
                Código de socio
              </label>
            </div>
            <div className="input-field col s12 m3 ">
              <input
                placeholder=""
                id="nombre"
                name="nombre"
                type="text"
                className="validate"
                value={
                  this.state.comprobante ? this.state.comprobante.Nombres : ""
                }
                disabled
              />
              <label className="active" htmlFor="nombre">
                Nombres y apellidos
              </label>
            </div>
            <div className="input-field col s12 m3 ">
              <input
                placeholder=""
                id="dni"
                name="dni"
                type="text"
                className="validate"
                value={this.state.comprobante ? this.state.comprobante.DNI : ""}
                disabled
              />
              <label className="active" htmlFor="dni">
                Documento de identidad
              </label>
            </div>
            <div className="input-field col s12 m3 ">
              {
                this.state.mostrarInputs ?
                  <input
                    placeholder=""
                    id="origen"
                    name="origen"
                    type="text"
                    className="validate"
                    value={
                      this.state.comprobante ? this.state.comprobante.origen : ""
                    }
                    disabled
                  /> : <input
                    placeholder=""
                    id="origen"
                    name="origen"
                    type="text"
                    className="validate"
                    value=""
                    disabled
                  />
              }
              <label className="active" htmlFor="origen">
                Origen
              </label>
            </div>
          </div>
          <div className="row label2">
            <div className="input-field col w-full sm:w-1/5 ">
              <input
                placeholder=""
                id="categoria"
                name="categoria"
                type="text"
                className="validate"
                value={
                  this.state.comprobante ? this.state.comprobante.categoria : ""
                }
                disabled
              />
              <label className="active" htmlFor="categoria">
                Categoría
              </label>
            </div>
            <div className="input-field col w-full sm:w-1/5 ">
              {this.state.mostrarInputs ?
                <input
                  placeholder=""
                  id="estado"
                  name="estado"
                  type="text"
                  className="validate"
                  value={
                    this.state.comprobante ? this.state.comprobante.estado : ""
                  }
                  disabled
                /> :
                <input
                  placeholder=""
                  id="estado"
                  name="estado"
                  type="text"
                  className="validate"
                  value=""
                  disabled
                />
              }
              <label className="active" htmlFor="estado">
                Estado
              </label>
            </div>
            <div className="input-field col w-full sm:w-1/5 ">
              <input
                placeholder=""
                id="fechaE"
                name="fechaE"
                type="text"
                className="validate"
                value={this.state.fechaEmision ? this.state.fechaEmision : ""}
                disabled
              />
              <label className="active" htmlFor="fechaE">
                Fecha de emisión
              </label>
            </div>

            <div className="input-field col w-full sm:w-1/5 ">
              <input
                placeholder=""
                id="fechaCancelacion"
                name="fechaCancelacion"
                type="text"
                className="validate "
                value={
                  this.state.fechaCancelacion ? this.state.fechaCancelacion : ""
                }
                disabled
              />
              <label className="active" htmlFor="fechaC">
                Fecha de cancelación
              </label>
            </div>
            <div className="input-field col w-full sm:w-1/5 ">
              <input
                placeholder=""
                id="cobro"
                name="cobro"
                type="text"
                className="validate "
                value={
                  this.state.comprobante ? this.state.comprobante.tipoCobro : ""
                }
                disabled
              />
              <label className="active" htmlFor="cobro">
                Tipo de cobro
              </label>
            </div>
          </div>
          <div className="row label1">
            <div className="input-field col s12 m4 ">
              <select
                name="tipoEstado"
                id="tipoEstado"
                className=""
                onChange={this.onChange}
                value={this.state.tipoEstado}
              >
                <option value="" disabled>
                  --Tipo de estado--
                </option>
                <option value="P">Pendiente</option>
                <option value="C">Cancelado</option>
                <option value="A">Anulado</option>
              </select>
              <label className="active" htmlFor="tipo">
                Estado de la nota de crédito
              </label>
            </div>
            <div className="input-field col s12 m4 ">
              <select
                name="tipoCobro"
                id="tipoCobro"
                onChange={this.onChange}
                value={this.state.tipoCobro}
                className=""
              >
                <option value="" disabled>
                  --Tipo de devolución--
                </option>
                {this.state.tipoCobros
                  ? this.state.tipoCobros.map((data) => {
                    return (
                      <option
                        key={data.TipoCobro_id}
                        value={data.TipoCobro_id}
                      >
                        {data.descrip}
                      </option>
                    );
                  })
                  : null}
              </select>
              <label className="active" htmlFor="tipo">
                Tipo de Devolución
              </label>
            </div>
          </div>
        </section>

        <section className="container mb-32">
          <DetaNota
            tabla={
              this.state.detaComprobante ? this.state.detaComprobante : null
            }
            eliminarFila={this.eliminarFila}
          />
        </section>
        {this.state.detaComprobante ? (
          <footer
            className="fixed2 fixed row bottom-0 w-full z-10"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <div className="col l2"></div>
            <div className="col l2">
              Igv: {this.state.footerIgv.toFixed(2)}{" "}
            </div>
            <div className="col l2">
              Monto total S/: {this.state.footerMonto.toFixed(2)}
            </div>
            <div className="col l2">
              {this.state.btnRegistrar ?
                <button
                  onClick={this.handleSubmit}
                  id="btnRegistrar"
                  type="button"
                  className="flex-1 btn waves-effect waves-light light-blue darken-4 redondeado btn-footer"
                >
                  Registrar
              </button>
                : <button
                  disabled
                  type="button"
                  className="flex-1 btn waves-effect waves-light light-blue darken-4 redondeado btn-footer"
                >
                  Registrar
              </button>}
            </div>
          </footer>
        ) : null}
      </Fragment>
    );
  }
}

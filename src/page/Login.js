import React, { Component } from "react";
import logo from "../images/logo.png";
import Api from "../Api";

import Swal from "sweetalert2";
import '../config';

export default class Login extends Component {

  // componentDidMount(){
  //  this.props.history.push("/financiamiento")
  // }
  state = {
    usuario: "",
    contraseña: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Login = async (e) => {
    //prevent
    e.preventDefault();
    //validar campos
    if (this.state.usuario !== "" && this.state.contraseña !== "") {
      //campos login
      const form = new FormData();
      form.append("usuario", this.state.usuario);
      form.append("contraseña", this.state.contraseña);

      //campo headers
      // const cabecera = new Headers();
      // cabecera.append(
      //   "Authorization",
      //   "Basic " + btoa(form.get("usuario") + ":" + form.get("contraseña"))
      // );
      // console.log(btoa(form.get('usuario') + ":" + form.get('contraseña')))

      //api login
      const respuesta = await Api.postData(
        `${global.config.URI_API}/api-csi-service/loginTrabajadores`,
        form
        // cabecera
      );
      // verificar datos del login
      if (!respuesta.body) {
        Swal.fire({
          icon: "warning",
          title: `${respuesta.error}`,
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log(respuesta.error.msg)
      } else {
        // console.log(respuesta.body.token)
        localStorage.setItem("token", respuesta.body.token);
        this.props.history.push("/menu-principal");
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Falta llenar campos",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  componentDidMount() {
    localStorage.removeItem("token");
  }

  render() {
    return (
      <React.Fragment>
        <div className="flex justify-center mt-6 md:mt-8">
          <div className="justify-center flex flex-col">
            <div className="px-10 py-8 mb-4 bg-white border-0 sm:border login rounded-3xl shadow-none sm:shadow-xl">
              <div className="text-center mt-4">
                <img className="responsive-img" src={logo} alt=""></img>
                <p className="text-xl m-0 font-medium">SIAS WEB</p>
              </div>
              <div className="mt-4">
                <div className="">
                  <form className="col s12">
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          placeholder=""
                          id="usuario"
                          name="usuario"
                          type="text"
                          className="validate"
                          onChange={this.onChange}
                          value={this.state.usuario}
                        />
                        <label className="active" htmlFor="usuario">
                          Usuario
                        </label>
                      </div>
                      <div className="input-field col s12">
                        <input
                          placeholder=""
                          id="contraseña"
                          name="contraseña"
                          type="password"
                          className="validate"
                          onChange={this.onChange}
                          value={this.state.contraseña}
                        />
                        <label className="active" htmlFor="contraseña">
                          Contraseña
                        </label>
                      </div>
                      <div className="input-field col s12">
                        <button onClick={this.Login} className="btn w-full light-blue darken-4 font-bold">
                          Ingresar
                        </button>
                        
                      </div>
                      <div className="input-field col s12 center-align">
                        {/* <img className="img-fluid w-full" src={captcha} alt=""/> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

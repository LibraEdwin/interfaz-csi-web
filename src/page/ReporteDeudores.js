import React, { useState, useEffect } from 'react'
import TableDeudores from '../components/TableDeudores'
import { LoaderReportes } from '../components/LoaderReportes';
import Navbar from '../components/Navbar'
import FooterRepoFinanciamiento from '../components/FooterRepoFinanciamiento';
import {handlePrint } from '../utitlitario';

import '../css/reporteVentas.css';
import Swal from 'sweetalert2';
import ExcelReporteDeudores from '../components/ExcelReporteDeudores';

import '../config';

const objDate = new Date()
const year = objDate.getFullYear()
const month = objDate.getMonth() + 1
const day = objDate.getDate()
const hour = objDate.getHours()
const minutes = objDate.getMinutes()
const currentDate = `${day}/${month}/${year} ${hour}:${minutes}`


export default function ReporteDeudores() {

    const [cuota1, setCuota1] = useState('')
    const [cuota2, setCuota2] = useState('')
    const [cuota1FromButtonClick, setCuota1FromButtonClick] = useState('')
    const [cuota2FromButtonClick, setCuota2FromButtonClick] = useState('')
    const [deudores, setDeudores] = useState(null)
    const [hidden, setHidden] = useState(true)
    const [loader, setLoader] = useState(false)
    const [active, setActive] = useState(true);
    const [theme, setTheme] = useState("rgb(172 192 208)")



    const handleChangeCuota1 = (e) => {
        setCuota1(e.target.value)
    }

    const handleChangeCuota2 = (e) => {
        setCuota2(e.target.value)
    }

    const handleClick = () => {
        setCuota1FromButtonClick(cuota1)
        setCuota2FromButtonClick(cuota2)
       
    }

    const calcTotal = totalType => {
        let total = 0;
        deudores?.forEach((deudor) => {
            total += deudor[totalType]
        })
        const moneda = new Intl.NumberFormat("es-PE", { style: 'currency', currency: 'PEN' }).format(total)
        return moneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    };


    useEffect(() => {
        if (cuota1FromButtonClick && cuota2FromButtonClick) {
            setLoader(true)
            fetch(`${global.config.URI_API}/api-csi-service/deudores?cuota1=${cuota1FromButtonClick}&cuota2=${cuota2FromButtonClick}`)
                .then(resp => {
                    if (resp.ok) {
                        return resp.json()
                    } else {
                        throw new Error(' Something went wrong')
                    }
                })
                .then(data => {
                    if (data.body.length !== 0) {
                        setDeudores(data.body)
                        setLoader(false)
                        setHidden(false)
                        setActive(false)
                        setTheme("#1E54A8")
                       
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'No hay registro de deudores',
                            showConfirmButton: true,
                        })
                    }

                })
                .catch(error => alert(error.message))
        }

    }, [cuota1FromButtonClick, cuota2FromButtonClick])


    return (
        <div id="reporte-ventas">
            <Navbar class="printMedia" name="Reporte de deudores" link="/reportes-cobranzas-caja" />
            <div className="container row ventas printMedia ">
                <div className="col s12 l2">
                    <label>Desde la cuota</label>
                    <input
                        type="number"
                        onChange={handleChangeCuota1}
                    />
                </div>
                <div className="col s12 l2">
                    <label>Hasta la cuota</label>
                    <input
                        type="number"
                        onChange={handleChangeCuota2}
                    />
                </div>
                <div className="col s12 l2"></div>
                <div className="col s12 l2">
                    <input
                        className="btn-ventas"
                        type="submit"
                        value="CONSULTAR"
                        onClick={handleClick}
                    />
                </div>
                <div className="col s12 l2">
                    <input
                        className="btn-ventas"
                        type="submit"
                        value="IMPRIMIR"
                        onClick={handlePrint}
                        disabled={active}
                        style={{ background: theme }}
                    />
                </div>
                <div className="col s12 l2">
                    <ExcelReporteDeudores
                        data={deudores}
                        theme={theme}
                        active={active} />
                </div>
            </div>
            { loader ?
                <LoaderReportes  title="de Deudores"/> :
                <div className={hidden ? 'container ventas info hidden' : 'container ventas info'}>
                    <p className="center-align">Reporte de Deudores</p>
                    <ul className="reporte-subtitle">
                        <li>Circolo Sportivo Italiano</li>
                        <li>Fecha: {currentDate}</li>
                    </ul>
                    <TableDeudores deudores={deudores} />
                </div>
            }
            <FooterRepoFinanciamiento montoTotal={calcTotal('Monto Deuda')} print="printMedia"/>
        </div>
    )
}

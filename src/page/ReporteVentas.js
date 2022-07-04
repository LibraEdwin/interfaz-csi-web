import { useState, useEffect } from 'react'

import '../css/reporteVentas.css';
import Swal from 'sweetalert2';

import { dateFormat, handlePrint } from '../utitlitario';
import Navbar from '../components/Navbar';
import FooterReporteVenta from '../components/FooterReporteVenta';
import { LoaderReportes } from '../components/LoaderReportes';
import CuadreResumen from '../components/CuadreResumen';
import ExcelReporteVentas from '../components/ExcelReporteVentas'
import TablaRepoVentas from '../components/TableRepoVentas';

import '../config';

function ReporteVentas() {
    const [reportesVentas, setReportesVentas] = useState({});
    const [cuadreResumen, setCuadreResumen] = useState([]);
    const [fi, setFi] = useState('');
    const [ff, setFf] = useState('');
    const [fiFromButtonClick, setFiFromButtonClick] = useState('');
    const [ffFromButtonClick, setFfFromButtonClick] = useState('');
    const [hidden, setHidden] = useState(true);
    const [loader, setLoader] = useState(false);
    const [active, setActive] = useState(true);
    const [theme, setTheme] = useState("rgb(172 192 208)")
    
    const handleClick = () => {
        setFiFromButtonClick(fi);
        setFfFromButtonClick(ff);
        
    };

    const calcTotal = totalType => {
        let total = 0;
        Object.values(reportesVentas).forEach((value) => {
            value.detalles.forEach(reporte => total += reporte[totalType]);
        })
        const moneda = new Intl.NumberFormat("es-PE", { style: 'currency', currency: 'PEN' }).format(total)
        return moneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    };

    const calcTotalCuadre = totalType => {
        let total = 0;
        cuadreResumen.forEach(cuadre => total += cuadre[totalType]);
        return total
    };

    const dataExcel = Object.values(reportesVentas).map(value => value.detalles)
     
    useEffect(() => {
        if (fiFromButtonClick && ffFromButtonClick) {
            setLoader(true)
            fetch(`${global.config.URI_API}/api-csi-service/ventas?fi=${fiFromButtonClick}&ff=${ffFromButtonClick}`)
                .then(resp => {
                    if (resp.ok) {
                        return resp.json()
                    } else {
                        throw new Error(' Something went wrong')
                    }
                })
                .then(data => {
                    if (Object.keys(data.body).length === 0) {
                        setHidden(true)
                        Swal.fire({
                            icon: 'warning',
                            title: 'No hay registro de ventas en esta fecha',
                            showConfirmButton: true,
                        })
                        setReportesVentas({})
                    } else {
                        setReportesVentas(data.body)
                        setLoader(false)
                        setHidden(false)
                        setActive(false)
                        setTheme("#1E54A8")
                    }
                }
                )
                .catch(error => alert(error.message))
        }

    }, [fiFromButtonClick, ffFromButtonClick])

    useEffect(() => {
        if (fiFromButtonClick && ffFromButtonClick) {
            fetch(`${global.config.URI_API}/api-csi-service/ventas/cuadre-reportes?fi=${fiFromButtonClick}&ff=${ffFromButtonClick}`)
                .then(resp => {
                    if (resp.ok) {
                        return resp.json()
                    } else {
                        throw new Error(' Something went wrong')
                    }
                })
                .then(data => {
                    setCuadreResumen(data.body)
                }
                )
                .catch(error => alert(error.message))
        }

    }, [fiFromButtonClick, ffFromButtonClick])


    return (
        <div id="reporte-ventas">
            <Navbar class="printMedia" name="Reporte de ventas" link="/reportes-cobranzas-caja" />
            <div className="container row ventas printMedia">
                <div className="col s12 l3">
                    <label>Fecha inical</label>
                    <input
                        type="date"
                        value={fi}
                        onChange={(e) => setFi(e.target.value)}
                    />

                </div>
                <div className="col s12 l3">
                    <label>Fecha final</label>
                    <input
                        type="date"
                        value={ff}
                        onChange={(e) => setFf(e.target.value)}
                    />
                </div>
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
                </div >
                <div className="col s12 l2">
                    <ExcelReporteVentas
                        data={dataExcel.flat()}
                        theme={theme}
                        active={active} />
                </div>
            </div>

            {
                loader ? <LoaderReportes title=" de Ventas" /> :
                    <div className={hidden ? 'container ventas info hidden' : 'container ventas info'}>
                        <p className="center-align">Registro de Ventas</p>
                        <ul className="reporte-subtitle">
                            <li>Circolo Sportivo Italiano</li>
                            <li>{dateFormat(fi)} a {dateFormat(ff)}</li>
                        </ul>
                        <TablaRepoVentas
                            reportesVentas={reportesVentas}
                            afecto={calcTotal("Afecto")}
                            inafecto={calcTotal("Inafecto")}
                            igv={calcTotal("IGV")}
                            total={calcTotal("Total")}
                        />
                        <CuadreResumen
                            cuadreResumen={cuadreResumen}
                            totalSoles={calcTotalCuadre('TotalSoles')}
                            totalDolares={calcTotalCuadre('Dolares') || 0}
                        />
                    </div>
            }
            {
                Object.keys(reportesVentas).length !== 0 ?
                    <FooterReporteVenta
                        totalAfecto={calcTotal("Afecto")}
                        totalInafecto={calcTotal("Inafecto")}
                        totalIGV={calcTotal("IGV")}
                        montoTotal={calcTotal("Total")}
                        print="printMedia" /> :
                    <FooterReporteVenta
                        totalAfecto="S/ 0.00"
                        totalInafecto="S/ 0.00"
                        totalIGV="S/ 0.00"
                        montoTotal="S/ 0.00"
                        print="printMedia"
                    />
            }
        </div>
    )
}

export default ReporteVentas

import { useState, useEffect } from 'react'
import '../css/reporteVentas.css';
import { dateFormat, currencyFormat, handlePrint } from '../utitlitario';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import TableRepoFinanciamiento from '../components/TableRepoFinanciamiento'
import { LoaderReportes } from '../components/LoaderReportes';
import FooterRepoFinanciamiento from '../components/FooterRepoFinanciamiento';

import { alertMessages } from '../components/alertMessages ';
import '../config';

import ExcelReportCobFinanciamiento from "../components/ExcelReportCobFinanciamiento"

export default function ReporteFinanciamiento() {

    const [reporteFinanciamiento, setReporteFinanciamiento] = useState({});
    const [fi, setFi] = useState('');
    const [ff, setFf] = useState('');
    const [fiFromButtonClick, setFiFromButtonClick] = useState('');
    const [ffFromButtonClick, setFfFromButtonClick] = useState('');
    const [hidden, setHidden] = useState(true);
    const [loader, setLoader] = useState(false);
    const [ active, setActive] = useState(true);
    const [ theme, setTheme] = useState("rgb(172 192 208)")

    const handleClick = () => {
        setFiFromButtonClick(fi);
        setFfFromButtonClick(ff);

    };

    useEffect(() => {
        if (fiFromButtonClick && ffFromButtonClick) {
            setLoader(true)
            fetch(`${global.config.URI_API}/api-csi-service/financiamiento?fi=${fiFromButtonClick}&ff=${ffFromButtonClick}`)
                .then(resp => {
                    if (resp.ok) {
                        return resp.json()
                    } else {
                        throw new Error('something went wrong')
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
                        setReporteFinanciamiento({})
                    } else {
                        setReporteFinanciamiento(data.body)
                        setLoader(false)
                        setHidden(false)
                        setActive(false)
                        setTheme("#1E54A8")
                    }
                })
                .catch(err => {
                    console.log(err.message)
                    alertMessages("La conexión está tardando más de los normal. Vuelva intentar luego", "error")
                })
        }

    }, [fiFromButtonClick, ffFromButtonClick])
    

    return (
        <div id="reporte-ventas">
            <Navbar class="printMedia" name="Reporte de cobros de financiamiento" link="/reportes-cobranzas-caja" />

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
                        className="btn-ventas w-full"
                        type="button"
                        value="CONSULTAR"
                        onClick={handleClick}
                    />
                </div>
                <div className="col s12 l2">
                    <input
                        className="btn-ventas w-full"
                        type="submit"
                        value="IMPRIMIR"
                        onClick={handlePrint}
                        disabled={active}
                        style={{background: theme}}
                    />
                </div>
                <div className="col s12 l2">
                    
                    <ExcelReportCobFinanciamiento data={reporteFinanciamiento.detalles} theme={theme} active={active} />

                </div>
            </div>
            {loader ? <LoaderReportes title=" de cobro de financiamiento" /> :
                <div className={hidden ? 'container ventas info hidden' : 'container ventas info'}>
                    <p className="center-align">Registro de cobro de financiamiento</p>
                    <ul className="reporte-subtitle">
                        <li>Circolo Sportivo Italiano</li>
                        <li>{dateFormat(fi)} a {dateFormat(ff)}</li>
                    </ul>
                    <TableRepoFinanciamiento reporteFinanciamiento={reporteFinanciamiento} />
                </div>
            }
            {
                Object.keys(reporteFinanciamiento).length !== 0 ? 
                <FooterRepoFinanciamiento 
                print="printMedia" 
                montoTotal={reporteFinanciamiento.total ? currencyFormat(reporteFinanciamiento.total.total) : "S/ 0.00"}/> :
                <FooterRepoFinanciamiento montoTotal="S/ 0.00" print="printMedia"/>
            }
           
        </div>
    )
}

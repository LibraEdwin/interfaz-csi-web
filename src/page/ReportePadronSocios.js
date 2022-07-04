import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Api from '../Api'
import Swal from 'sweetalert2';
import { alertMessages } from '../components/alertMessages ';
import { LoaderReportes } from '../components/LoaderReportes';
import TablaRepoPadronSocios from '../components/TablaRepoPadronSocios';
import ExcelReportPadronSocio from '../components/ExcelReportPadronSocio';
import { handlePrint, capitalized } from '../utitlitario';
import FooterReportPadronSocio from '../components/FooterReportPadronSocios';




export default function ReportePadronSocios() {

    const [estados, setEstados] = useState([])
    const [idEstado, setIdEstado] = useState('')
    const [socios, setSocios] = useState([])
    const [loader, setLoader] = useState(false)
    const [idEstadoFromBtn, setIdEstadoFromBtn] = useState('')
    const [hidden, setHidden] = useState(true)
    const [disabledConsultar, setDisabledConsultar] = useState(true);
    const [disabledImprimir, setDisabledImprimir] = useState(true);
    const [tipoSocio, setTipoSocio] = useState('')
    const [totalTipoSocio, setTotalTipoSocio] = useState('')
 

    const handleChange = (e) => {
        setIdEstado(e.target.value)
        setDisabledConsultar(false)
        setDisabledImprimir(true)
        setTotalTipoSocio('')
    }

    const handleClick = () => {
        setIdEstadoFromBtn(idEstado)
    }

   
    useEffect(() => {

        if(idEstado){

            const url = `${global.config.URI_API}/api-csi-service/estados?codigo=${idEstado}`
         
            Api.getData(url)
                .then(data => {

                    const estado = capitalized(data.body[0].nomest)
                    setTipoSocio(estado)          
                })
                .catch(err =>
                    console.log(err))

        }
       
    }, [idEstado])

  
console.log("ojo", tipoSocio);
    useEffect(() => {
        const urlEstado = `${global.config.URI_API}/api-csi-service/estados`
        Api.getData(urlEstado)
            .then(data => {
                if (data) {
                    setEstados(data.body)
                }
            })
            .catch(err =>
                console.log(err))
    }, [])

    useEffect(() => {
        if (idEstadoFromBtn) {
            setLoader(true)
            fetch(`${global.config.URI_API}/api-csi-service/socio/reporte?estado=${idEstadoFromBtn}`)
                .then(resp => {
                    if (resp.ok) {
                        return resp.json()
                    } else {
                        throw new Error('something went wrong')
                    }
                })
                .then(data => {
                    if (data.body.length === 0) {
                        setHidden(true)
                        Swal.fire({
                            icon: 'warning',
                            title: 'No hay registros',
                            showConfirmButton: true,
                        })
                        setSocios([])
                    } else {
                        setSocios(data.body[0])
                        setTotalTipoSocio(data.body[1].total)
                        setLoader(false)
                        setHidden(false)
                        setDisabledImprimir(false)
                       
                    }
                })
                .catch(err => {
                    console.log(err.message)
                    alertMessages("La conexión está tardando más de los normal. Vuelva intentar luego", "error")
                })
        }

    }, [idEstadoFromBtn])

    return (
            <div id="reporte-ventas">
                <Navbar class="printMedia" name="Reporte padrón de socios" link="/reporte-socios" />
                <div className="container row ventas printMedia">
                    <div className="col s12 l3">
                        <label>Estado de socios</label>
                        <select id="list" onChange={handleChange}>
                            <option defaultValue selected={true} disabled={true}>Seleccione un estado</option>
                            {estados.map(estado =>
                                <option key={estado.Estado_ID} value={estado.Estado_ID}>{estado.nomest}</option>)
                            }
                        </select>
                    </div>
                    <div className="col s12 l3">
                        <input
                            type="submit"
                            value="CONSULTAR"
                            onClick={handleClick}
                            disabled={disabledConsultar}
                            className={ disabledConsultar ? "btn-disabled" : "btn-ventas"}
                        />
                    </div>
                    <div className="col s12 l3">
                        <input
                            className={ disabledImprimir ? "btn-disabled" : "btn-ventas"}
                            type="submit"
                            value="IMPRIMIR"
                            disabled={disabledImprimir}
                            onClick={handlePrint}                       
                        />
                    </div >
                    <div className="col s12 l3"  >
                        <ExcelReportPadronSocio
                        data={socios}
                        active={disabledImprimir}
                        />
                    </div>
                </div>
                {
                    loader ?
                        <LoaderReportes title="padrón de socios" />
                        :
                        <div className={hidden ? 'container ventas info hidden' : 'container ventas info'}>
                            <p className="center-align">Registro padrón de socios </p>
                            <TablaRepoPadronSocios socios={socios} />
                        </div>
                }
                 <FooterReportPadronSocio 
                    print="printMedia"
                    tipoDeSocio={tipoSocio}
                    // tipoDeSocio={tipoSocio ? capitalized(tipoSocio): ''}
                    totalSocio={totalTipoSocio}
                 />
            </div>
    )
}

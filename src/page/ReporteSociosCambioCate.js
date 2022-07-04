import Navbar from '../components/Navbar'
import Swal from 'sweetalert2';
import { alertMessages } from '../components/alertMessages ';
import '../css/reporteSocios.css'
import { useState, useEffect } from 'react'
import Api from '../Api'
import { LoaderReportes } from '../components/LoaderReportes';
import TablaSociosCambioCate from '../components/TablaSociosCambioCate';
import FooterSociosCambioCate from '../components/FooterSociosCambioCate'
import { handlePrint } from '../utitlitario';



export default function ReporteSociosCambioCate() {
    const [codigo, setCodigo] = useState('')
    const [codigoFromBtn, setCodigoFromBtn] = useState('')
    const [loader, setLoader] = useState(false)
    const [socios, setSocios] = useState([])
    const [hidden, setHidden] = useState(true)
    const [disabledVer, setDisabledVer] = useState(true);

    const handleChange = (e) => {
        setCodigo(e.target.value);
        setDisabledVer(false)
        setHidden(true)
    }

    const handleChangeFromBtm = () => {
        setCodigoFromBtn(codigo)
    }

    useEffect( () => {

    if(codigoFromBtn){
        const url = `${global.config.URI_API}/api-csi-service/socio/reporte-cambio-categoria?codigo=${codigoFromBtn}`
        Api.getData(url)
        .then( data => {
            setSocios(data.body)
        })
        .catch( err => {
            console.log(err);
        })
    }
  },[codigoFromBtn])

  console.log('data', socios);
  
  useEffect(() => {

    if (codigoFromBtn) {
        setLoader(true)
        fetch(`${global.config.URI_API}/api-csi-service/socio/reporte-cambio-categoria?codigo=${codigoFromBtn}`)
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
                    setSocios(data.body)
                    setLoader(false)
                    setHidden(false)
                    // setDisabledImprimir(false)  
                }
            })
            .catch(err => {
                console.log(err.message)
                alertMessages("La conexión está tardando más de los normal. Vuelva intentar luego", "error")
            })
    }

}, [codigoFromBtn])

    return (
        <div id="reporte-ventas">
            <Navbar class="printMedia" name="Reporte de socios para cambio de categoría" link="/reporte-socios" />
            <div className="container row ventas printMedia">
                <label>Listas de socios que pasan de:</label>
                <br></br>
                <div className="repoSocios">
                    <label>
                        <input 
                            type="radio"
                            id="1" 
                            name="categoria" 
                            value="1" 
                            onChange={handleChange}
                            style={{ opacity: 50, marginRight: 5, position: 'relative'}} />
                        <label htmlFor="1">Efectivos o simpatizantes a Jubilados</label>
                    </label>
                    <label>
                        <input 
                            type="radio"  
                            id="2" name="categoria" 
                            value="2" 
                            onChange={handleChange}
                            style={{ opacity: 50, marginRight: 5, position: 'relative'}} />
                        <label htmlFor="2">Jubilados a vitalicios</label>
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            id="3" 
                            name="categoria" 
                            onChange={handleChange}
                            value="3" style={{ opacity: 50, marginRight: 5, position: 'relative' }} />
                        <label htmlFor="3">Estudiantes a efectivos o simpatizantes</label>
                    </label>
                    <div >
                        <input
                            type="submit"
                            value="Ver"
                            disabled={disabledVer}
                            className={disabledVer ? "btn-disabled-repSocios" : "btn-repoSocios"}
                            onClick={handleChangeFromBtm}
                        />
                    </div>
                </div>
            </div>
            {
                    loader ?
                        <LoaderReportes title="de socios para cambio de categoría"/>
                        :
                        <div className={hidden ? 'container ventas info hidden' : ' container ventas info'} >
                            {
                                codigo === '1' ? 
                                <>
                                <p className="center-align">Listado socios para cambio de categoría jubilados</p>
                                <TablaSociosCambioCate socios={socios} />
                                </> : ''
                            }
                            {
                                codigo === '2' ? 
                                <>
                                <p className="center-align">Listado socios para cambios de categoría vitalicios - 2013 al 2015</p>
                                <TablaSociosCambioCate socios={socios} />
                                </> : ''
                            }
                            {
                                codigo === '3' ? 
                                <>
                                <p className="center-align">Listado socios estudiantes para cambio de categoría</p>
                                <TablaSociosCambioCate socios={socios} />
                                </> : ''
                            }                        
                        </div>
                }
            <FooterSociosCambioCate active={hidden} print={handlePrint} />
        </div>
    )
}

import imprimir from '../images/imprimir.svg'
import '../css/reporteSocios.css'
import { handlePrint } from '../utitlitario';

export default function FooterSociosCambioCate({active}) {
    return (
        <footer className={`footer-reporte printMedia`}>
                <div className="btnImprimir-wrapper container">
                    <button className={ active ? 'btnImprimirDisabled' : 'btnImprimir'} onClick={handlePrint}>
                        <img src={imprimir} alt={'imprimir'} style={{paddingRight: 10}}/>IMPRIMIR
                    </button>
                </div>
        </footer>
    )
}

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'materialize-css/dist/css/materialize.css'
import '../global.css'
import '../framework.css'

import Login from '../page/Login'
import Nota from '../page/NotaCredito'
import Financiamiento from '../page/Financiamiento'

import Layout from './Layout'
import MenuPrincipal from '../page/MenuPrincipal'
import ModuloReportes from '../page/ModuloReportes'
import ReporteCobranzas from '../page/ReporteCobranzas'
import ReporteVentas from '../page/ReporteVentas'
import ReporteFinanciamiento from '../page/ReporteFinanciamiento'
import ReporteDeudores from '../page/ReporteDeudores'
import ReporteSocios from '../page/ReporteSocios'
import ReportePadronSocios from '../page/ReportePadronSocios'
import ReporteSociosCambioCate from '../page/ReporteSociosCambioCate'



function App() {


    return (
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/menu-principal" component={MenuPrincipal} />
						<Route exact path="/nota-de-credito" component={Nota} />
						<Route exact path="/financiamiento" component={Financiamiento} />
						<Route exact path="/modulo-reportes" component={ModuloReportes} />
						<Route exact path="/reportes-cobranzas-caja" component={ReporteCobranzas}/>
						<Route exact path="/reportes-ventas" component={ReporteVentas}/>
						<Route exact path="/reporte-financiamiento" component={ReporteFinanciamiento}/>
						<Route exact path="/reporte-deudores" component={ReporteDeudores}/>
						<Route exact path="/reporte-socios" component={ReporteSocios}/>
						<Route exact path="/reporte-padron-socios" component={ReportePadronSocios}/>
						<Route exact path="/reporte-socios-cambio-categoria" component={ReporteSociosCambioCate}/>





					</Switch>
				</Layout>
			</BrowserRouter>
		);
    }

export default App
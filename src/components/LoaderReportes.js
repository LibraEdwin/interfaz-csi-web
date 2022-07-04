import ContentLoader from 'react-content-loader';

const LoaderReportes = ({hidden, title}) => (
	<div className={`container ventas info ${hidden}`} >
		<p className="center-align">Registro {title}</p>
		<p style={{ paddingLeft: 20 }}>Circolo Sportivo Italiano</p>
		<div className="main-card">
			<ContentLoader viewBox="50 0 1000 200">
				<rect x="80" y="120" rx="5" ry="5" width="920" height="43" />
				<rect x="80" y="40" rx="5" ry="5" width="125" height="40" />
				<rect x="220" y="40" rx="5" ry="5" width="125" height="40" />
				<rect x="360" y="40" rx="5" ry="5" width="165" height="40" />
				<rect x="540" y="40" rx="5" ry="5" width="125" height="40" />
				<rect x="680" y="40" rx="5" ry="5" width="175" height="40" />
				<rect x="870" y="40" rx="5" ry="5" width="130" height="40" />
				<rect x="80" y="95" rx="5" ry="5" width="930" height="2" />
			</ContentLoader>
		</div>
	</div>
);

export { LoaderReportes}

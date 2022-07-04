import React from 'react';
import { Link } from 'react-router-dom';

const DataList = ({ title, data, subtitle1, subtitle2, arrow, link, subtitleLink}) => {

    return (
			<div className="container">
				<p className="titulo">{title}</p>
				<ul className="list">
					<li>{subtitle1}</li>
					<Link style={{color: "black"}} to={link}>{subtitleLink}</Link>
					<i className="material-icons small" style={{ color: 'black' }}>{arrow}</i>
					<li>{subtitle2}</li>
				</ul>
				{data.map((d) => (
					<Link to={d.link} className="ojo" key={d.title}>
						{d.title}
						<i className="material-icons small" style={{ color: 'black' }}>
							keyboard_arrow_right
						</i>
					</Link>
				))}
			</div>
		);
}

export default DataList;

import React from 'react'

export default function ConsultaFechas({fi,ff, handleClick, handlePrint, handleOnChange}) {
    return (
        <div className="container row ventas printMedia">
        <div className="col s12 l3">
            <label>Fecha inical</label>
            <input
                type="date"
                value={fi}
                // onChange={()=>handleOnChange(e)}
            />
        </div>
        <div className="col s12 l3">
            <label>Fecha final</label>
            <input
                type="date"
                value={ff}
                // onChange={()=>handleOnChange(e.target.value)}
            />
        </div>
        <div className="col s12 l3">
            <input
                className="btn-ventas w-full"
                type="submit"
                value="CONSULTAR"
                onClick={handleClick}
            />
        </div>
        <div className="col s12 l3">
            <input
                className="btn-ventas w-full"
                type="submit"
                value="IMPRIMIR"
                onClick={handlePrint}
            />
        </div>
    </div>
    )
}

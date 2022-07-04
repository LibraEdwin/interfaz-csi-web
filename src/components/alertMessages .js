// import React from 'react'
import MySwal from "sweetalert2";

export const alertMessages  = (mensaje, tipo) => {

    MySwal.fire({
        title: 'Información',
        text: mensaje,
        icon: tipo,
        confirmButtonColor: '#0D47A1 '
      })    
}

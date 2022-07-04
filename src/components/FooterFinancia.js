import React from "react";

const FooterFinancia = () => {
  return (
    <footer className="fixed bottom-0 w-full z-10">
      <div className="flex justify-center items-center grey lighten-5 border-t px-2 sm:px-0">
        <div className="flex w-full sm:w-auto items-center text-center">
          <p className="font-bold flex-1 sm:mr-12">Monto total S/:</p>
          <p className="font-bold flex-1 sm:mr-12">0.00</p>
          <p className="font-bold flex-1 sm:mr-12">Fracción</p>
          <p className="font-bold flex-1 sm:mr-12">180.00</p>
          <p className="font-bold flex-1 sm:mr-12">Mensual</p>
          <p className="font-bold flex-1 sm:mr-12">0.00</p>
          <div>
            <button type="submit" className="flex-1 btn waves-effect waves-light light-blue darken-4 redondeado btn-footer" >Fraccionar </button>
          </div>
        </div>
      </div>
    </footer>
    
  );
};

export default FooterFinancia;
